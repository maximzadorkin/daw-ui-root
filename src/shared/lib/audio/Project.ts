import { isEmpty } from 'lodash';
import { action, makeObservable, observable, observe } from 'mobx';
import { Audio as BaseAudio } from './Audio';
import { Track as BaseTrack } from './Track';

export interface ProjectConstructorProps<
    Track extends BaseTrack<Audio>,
    Audio extends BaseAudio,
> {
    id: string;

    tracks?: Track[];
}

const ObservableProps = {
    id: observable,
    context: observable,
    tracks: observable,
    isPlaying: observable,
    _playTime: observable,
    _userVolume: observable,
    startPlayAt: observable,
    playTimeTimer: observable,
    initWorklets: action,
    duration: observable,
    play: action,
    pause: action,
    stop: action,
    addTrack: action,
    removeTrack: action,
    computePlayingStateByTracks: action,
    computeDuration: action,
    observeThis: action,
    subscribeOnTrackDurationChange: action,
};

export class Project<Track extends BaseTrack<Audio>, Audio extends BaseAudio> {
    public readonly id: string;

    protected readonly context: AudioContext;

    public tracks: Track[];

    public isPlaying: boolean;

    public _playTime: number;

    public static readonly MIN_USER_VOLUME = 0;

    public static readonly MAX_USER_VOLUME = 1.3;

    protected _userVolume: number;

    protected userGain: GainNode;

    private startPlayAt: number | null;

    public get playTime(): number {
        return this._playTime;
    }

    public set playTime(expectedValue: number) {
        this._playTime = expectedValue;
    }

    protected playTimeTimer?: number;

    public duration: number;

    constructor({ id, tracks }: ProjectConstructorProps<Track, Audio>) {
        this.context = new AudioContext();
        this.userGain = new GainNode(this.context);
        this.userGain.connect(this.context.destination);

        this.id = id;
        this.tracks = tracks ?? [];
        this.isPlaying = false;
        this.playTime = 0;
        this._playTime = 0;
        this.startPlayAt = null;
        this._userVolume = 1;
        this.userVolume = 1;
        this.duration = 0;

        void this.initWorklets();

        this.computePlayingStateByTracks();
        this.subscribeOnTrackDurationChange();
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
    protected initWorklets = async (): Promise<void> => {
        await this.context.audioWorklet.addModule(
            './worklets/current-volume.js',
        );
    };

    public play = (): void => {
        this.tracks.forEach((track) => {
            track.play(this._playTime);
            track.contextNode?.connect(this.userGain);
        });

        this.computePlayingStateByTracks();

        if (!this.isPlaying) {
            return;
        }

        this.startPlayAt = this.getNowSeconds() - this._playTime;
        void this.context.resume();
        this.playTimeTimer = window.setInterval(
            action(() => {
                this._playTime =
                    this.getNowSeconds() -
                    (this.startPlayAt ?? this.getNowSeconds());
            }),
            1,
        );
    };

    private getNowSeconds = (): number => {
        return this.msToSeconds(Date.now());
    };

    private secondsToMs = (value: number): number => value * 1000;

    private msToSeconds = (value: number): number => value / 1000;

    public pause = (): void => {
        this.tracks.forEach((track) => {
            track.stop();
        });
        this.computePlayingStateByTracks();

        if (!this.isPlaying) {
            clearInterval(this.playTimeTimer);
            this.playTimeTimer = undefined;
            this._playTime =
                this.getNowSeconds() -
                (this.startPlayAt ?? this.getNowSeconds());

            void this.context.suspend();
        }
    };

    public stop = (): void => {
        this.tracks.forEach((track) => {
            track.stop();
        });
        this.computePlayingStateByTracks();

        if (!this.isPlaying) {
            clearInterval(this.playTimeTimer);
            this.playTimeTimer = undefined;
            this._playTime = 0;
            this.startPlayAt = null;
            void this.context.suspend();
        }
    };

    public addTrack = (track: Track): void => {
        this.tracks.push(track);
        this.subscribeOnTrackDurationChange();
    };

    public removeTrack = (trackId: string): void => {
        this.tracks = this.tracks.filter(({ id }) => id !== trackId);
        this.subscribeOnTrackDurationChange();
    };

    protected computePlayingStateByTracks = (): void => {
        this.isPlaying = !isEmpty(
            this.tracks.filter((track) => track.isPlaying),
        );
    };

    public computeDuration = (): number => {
        this.duration = this.tracks.reduce(
            (duration, track) => Math.max(duration, track.computeDuration()),
            0,
        );
        return this.duration;
    };

    protected observeThis = (): void => {
        makeObservable(this, ObservableProps);

        observe(this, 'tracks', () => {
            this.computePlayingStateByTracks();
            this.computeDuration();
            this.observeTracksDuration();
        });
        this.observeTracksDuration();
    };

    protected observeTracksDuration = (): void => {
        this.tracks.forEach((track) => {
            observe(track, 'duration', this.computeDuration);
        });
    };

    protected subscribeOnTrackDurationChange = (): void => {
        this.tracks.forEach((track) => {
            track.subscribeOnChangeDuration(this.computeDuration);
        });
    };
}
