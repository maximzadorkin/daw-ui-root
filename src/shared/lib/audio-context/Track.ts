import { PALETTE_COLORS, PaletteColor } from '@quarx-ui/core';
import { isEmpty } from 'lodash';
import { action, makeObservable, observable, observe } from 'mobx';
import { Audio } from './Audio';
import { MediaDevices } from './MediaDevices';
import { Record } from './Record';
import { RecordingAudio } from './RecordingAudio';

type Fx = { id: string; contextNode: AudioNode };

export interface TrackConstructorProps {
    id: string;

    mute?: boolean;

    audios?: Audio[];

    fxs?: Fx[];

    context: AudioContext;

    name: string;

    input?: InputDeviceInfo;

    color?: Exclude<PaletteColor, 'danger'>;
}

export class Track {
    @observable
    public readonly id: string;

    @observable
    public audios: Audio[];

    @observable
    public fxs: Fx[];

    @observable
    private _mute: boolean;

    @observable
    protected externalAudioNode: GainNode;

    @observable
    public name: string;

    @observable
    public color: Exclude<PaletteColor, 'danger'>;

    public get mute(): boolean {
        return this._mute;
    }

    public set mute(value: boolean) {
        this.externalAudioNode.gain.value = Number(!value);
        this._mute = value;
    }

    @observable
    public isPlaying = false;

    @observable
    public duration: number = 0;

    @observable
    protected readonly context: AudioContext;

    public static readonly MIN_CURRENT_VOLUME: number = 0;

    public static readonly MAX_CURRENT_VOLUME: number = 255;

    public get contextNode(): AudioNode | null {
        /*
            AUDIO NODE STEPS:
            audios -> fxs -> panner -> gain -> analyser -> muteGainNode ...
         */

        let firstQueueNode: AudioNode = this.panner;

        this.fxs.forEach((fx) => {
            fx.contextNode?.connect(firstQueueNode);
            firstQueueNode = fx.contextNode;
        });

        this.audios.forEach((audio) => {
            audio.contextNode?.connect(firstQueueNode);
        });

        if (this.record?.recorder.stream) {
            if (this.record.isRecording) {
                this.record.contextNode.connect(firstQueueNode);
            } else {
                this.record.contextNode.disconnect();
            }
        }

        this.panner
            .connect(this.gain)
            .connect(this.analyser)
            .connect(this.externalAudioNode);

        return this.externalAudioNode;
    }

    @observable
    protected readonly gain: GainNode;

    @observable
    protected _volume: number;

    public static readonly MIN_VOLUME: number = 0;

    public static readonly MAX_VOLUME: number = 1.3;

    public get volume(): number {
        return this._volume;
    }

    public set volume(intendedValue: number) {
        const value = parseFloat(
            Math.min(
                Math.max(intendedValue, Track.MIN_VOLUME),
                Track.MAX_VOLUME,
            ).toFixed(2),
        );

        this.gain.gain.value = value;
        this._volume = value;
    }

    @observable
    protected readonly panner: PannerNode;

    @observable
    protected _pan: number;

    public static readonly LIMIT_LEFT_PAN = -100;

    public static readonly LIMIT_RIGHT_PAN = 100;

    public get pan(): number {
        return this._pan;
    }

    public set pan(intendedValue: number) {
        const value = Math.min(
            Math.max(intendedValue, Track.LIMIT_LEFT_PAN),
            Track.LIMIT_RIGHT_PAN,
        );

        this.panner.positionX.value = value;
        this._pan = value;
    }

    @observable
    protected analyser: AnalyserNode;

    @observable
    public readonly mediaDevices: MediaDevices;

    @observable
    public input?: InputDeviceInfo;

    @observable
    public record?: Record;

    @observable
    public recordingAudios?: RecordingAudio[];

    constructor({
        id,
        mute,
        audios,
        fxs,
        context,
        name,
        input,
        color,
    }: TrackConstructorProps) {
        makeObservable(this);

        this.id = id;
        this.audios = audios ?? [];
        this.fxs = fxs ?? [];
        this.name = name;
        this.context = context;

        // basics fx
        this.externalAudioNode = new GainNode(this.context);
        this.mute = mute ?? false;
        this._mute = this.mute;

        this.gain = new GainNode(this.context);
        this._volume = 1;
        this.volume = 1;

        this.panner = new PannerNode(this.context);
        this._pan = 0;
        this.pan = 0;

        this.analyser = new AnalyserNode(this.context);
        // end of basics fx

        this.mediaDevices = new MediaDevices();

        this.input = input ?? this.mediaDevices.audioInputs[0];
        this.color = color ?? PALETTE_COLORS.secondary;

        this.computePlayingStateByAudios();
        this.subscribeOnAudioDurationChange();
        this.mediaDevices.subscribeOnChange(() => this.onChangeInput());

        void this.onChangeInput().finally(() => {
            this.record?.subscribeOnStopRecording(this.onStopRecording);
        });

        observe(this, 'input', (target) => this.onChangeInput(target.newValue));
    }

    @action
    public play = (contextTime: number = 0, currentTime: number = 0): void => {
        if (this.mute) {
            return;
        }

        this.audios.forEach((audio) => {
            audio.play(contextTime, currentTime);
        });
        this.computePlayingStateByAudios();
    };

    @action
    public stop = (): void => {
        this.audios.forEach((audio) => {
            audio.stop();
        });
        this.computePlayingStateByAudios();
    };

    @action
    protected computePlayingStateByAudios = (): void => {
        this.isPlaying = !isEmpty(
            this.audios.filter((audio) => audio.isPlaying),
        );
    };

    @action
    public addAudio = (audio: Audio): void => {
        this.audios.push(audio);
        this.subscribeOnAudioDurationChange();
    };

    @action
    public removeAudio = (audioId: string): void => {
        this.audios = this.audios.filter(({ id }) => id !== audioId);
        this.subscribeOnAudioDurationChange();
    };

    @action
    public addFx = (fx: Fx): void => {
        this.fxs.push(fx);
    };

    @action
    public removeFx = (fxId: string): void => {
        this.fxs = this.fxs.filter(({ id }) => id !== fxId);
    };

    @action
    public computeCurrentVolume = (): number => {
        const array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        return arraySum / array.length;
    };

    @action
    public subscribeOnChangeDuration = (callback: () => {}): void => {
        observe(this, 'duration', callback);
    };

    @action
    public computeDuration = (): number => {
        this.duration = this.audios.reduce(
            (duration, audio) =>
                Math.max(duration, audio.duration + audio.offset),
            0,
        );
        return this.duration;
    };

    @action
    protected onChangeInput = async (
        input?: InputDeviceInfo,
    ): Promise<void> => {
        this.record?.stop();
        this.record?.contextNode.disconnect();

        if (!input) {
            this.record = undefined;
            return;
        }

        this.record = new Record({
            context: this.context,
            device: await this.mediaDevices.getMedia(input),
        });
        this.record.subscribeOnStopRecording(this.onStopRecording);
    };

    @action
    protected onStopRecording = async (
        recorded: RecordingAudio,
    ): Promise<void> => {
        const buffer = await new Blob(recorded?.blob).arrayBuffer();
        const audioBuffer = await this.context.decodeAudioData(buffer);

        this.recordingAudios = this.recordingAudios?.filter(
            ({ id }) => id !== recorded.id,
        );

        this.addAudio(
            new Audio({
                id: recorded.id,
                src: audioBuffer,
                offset: recorded.offset,
                context: this.context,
            }),
        );
    };

    @action
    protected subscribeOnAudioDurationChange = (): void => {
        this.audios.forEach((audio) => {
            audio.subscribeOnChangeDuration(this.computeDuration);
            audio.subscribeOnChangeOffset(this.computeDuration);
        });
    };
}
