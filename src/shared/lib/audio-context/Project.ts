import { intersection, isEmpty } from 'lodash';
import { action, makeObservable, observable, observe } from 'mobx';
import { createID } from '@quarx-ui/core';
import { RecordingAudio } from './RecordingAudio';
import { Track } from './Track';

export interface ProjectConstructorProps {
    id: string;

    tracks?: Track[];
}

export class Project {
    @observable
    public readonly id: string;

    @observable
    public readonly context: AudioContext;

    @observable
    public tracks: Track[];

    @observable
    public isPlaying: boolean;

    @observable
    public isRecording: boolean;

    @observable
    public playTime: number;

    public static readonly MIN_USER_VOLUME = 0;

    public static readonly MAX_USER_VOLUME = 1.3;

    @observable
    protected _userVolume: number;

    @observable
    protected userGain: GainNode;

    @observable
    private startPlayAt: number | null;

    @observable
    protected playTimeTimer?: number;

    @observable
    public duration: number;

    constructor({ id, tracks }: ProjectConstructorProps) {
        makeObservable(this);
        this.context = new AudioContext();
        this.userGain = new GainNode(this.context);
        this.userGain.connect(this.context.destination);

        this.id = id;
        this.tracks = tracks ?? [];
        this.isPlaying = false;
        this.playTime = 0;
        this.startPlayAt = null;
        this._userVolume = 1;
        this.userVolume = 1;
        this.duration = 0;
        this.isRecording = false;

        void this.initWorklets();

        this.computePlayingStateByTracks();
        this.subscribeOnTrackDurationChange();

        observe(this, 'tracks', () => {
            this.computePlayingStateByTracks();
            this.computeDuration();
            this.observeTracksDuration();
        });
    }

    public get userVolume() {
        return this._userVolume;
    }

    public set userVolume(expectedValue: number) {
        const value = parseFloat(
            Math.min(
                Math.max(expectedValue, Project.MIN_USER_VOLUME),
                Project.MAX_USER_VOLUME,
            ).toFixed(2),
        );

        this.userGain.gain.value = value;
        this._userVolume = value;
    }

    // ToDo: Стоит перенести в другое место с инициализацией сторонних WAM модулей
    @action
    protected initWorklets = async (): Promise<void> => {
        await this.context.audioWorklet.addModule(
            './worklets/current-volume.js',
        );
    };

    @action
    public play = (): void => {
        this.tracks.forEach((track) => {
            track.play(this.context.currentTime, this.playTime);
            track.contextNode?.connect(this.userGain);
        });

        this.computePlayingStateByTracks();

        if (!this.isPlaying) {
            return;
        }

        this.startPlayAt = this.getNowSeconds() - this.playTime;
        void this.context.resume();
        this.playTimeTimer = window.setInterval(
            action(() => {
                this.playTime =
                    this.getNowSeconds() -
                    (this.startPlayAt ?? this.getNowSeconds());
            }),
            1,
        );
    };

    @action
    private getNowSeconds = (): number => {
        return this.msToSeconds(Date.now());
    };

    @action
    private secondsToMs = (value: number): number => value * 1000;

    @action
    private msToSeconds = (value: number): number => value / 1000;

    @action
    public pause = (): void => {
        this.tracks.forEach((track) => {
            track.stop();
        });
        this.computePlayingStateByTracks();

        if (!this.isPlaying) {
            clearInterval(this.playTimeTimer);
            this.playTimeTimer = undefined;
            this.playTime =
                this.getNowSeconds() -
                (this.startPlayAt ?? this.getNowSeconds());

            void this.context.suspend();
        }
    };

    @action
    public stop = (): void => {
        this.tracks.forEach((track) => {
            track.stop();
        });
        this.computePlayingStateByTracks();

        if (!this.isPlaying) {
            clearInterval(this.playTimeTimer);
            this.playTimeTimer = undefined;
            this.playTime = 0;
            this.startPlayAt = null;
            void this.context.suspend();
        }
    };

    @action
    public startRecord = (forTracks: Track[]): void => {
        const audios = Array.from({ length: forTracks.length }).map(
            () =>
                new RecordingAudio({
                    id: createID(), // todo: на сервере
                    offset: this.playTime,
                    context: this.context,
                }),
        );

        intersection(this.tracks, forTracks).forEach((track, index) => {
            track.record?.start(audios[index]);
        });

        this.play();

        setTimeout(this.computeIsRecording);
    };

    @action
    public stopRecord = (): void => {
        this.pause();
        this.tracks.forEach((track) => {
            track.record?.stop();
        });

        setTimeout(this.computeIsRecording);
    };

    @action
    private computeIsRecording = (): void => {
        this.isRecording = this.tracks.reduce((acc, track) => {
            return acc || Boolean(track?.record?.isRecording);
        }, false);
    };

    @action
    public addTrack = (track: Track): void => {
        this.tracks.push(track);
        this.subscribeOnTrackDurationChange();
    };

    @action
    public removeTrack = (trackId: string): void => {
        this.tracks = this.tracks.filter(({ id }) => id !== trackId);
        this.subscribeOnTrackDurationChange();
    };

    @action
    protected computePlayingStateByTracks = (): void => {
        this.isPlaying = !isEmpty(
            this.tracks.filter((track) => track.isPlaying),
        );
    };

    @action
    public computeDuration = (): number => {
        this.duration = this.tracks.reduce(
            (duration, track) => Math.max(duration, track.computeDuration()),
            0,
        );
        return this.duration;
    };

    @action
    protected observeTracksDuration = (): void => {
        this.tracks.forEach((track) => {
            observe(track, 'duration', this.computeDuration);
        });
    };

    @action
    protected subscribeOnTrackDurationChange = (): void => {
        this.tracks.forEach((track) => {
            track.subscribeOnChangeDuration(this.computeDuration);
        });
    };
}
