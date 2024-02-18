import { isEmpty } from 'lodash';
import { action, computed, makeObservable, observable, observe } from 'mobx';
import { Audio as BaseAudio } from './Audio';

type Fx = { id: string; contextNode: AudioNode };

export interface TrackConstructorProps<Audio extends BaseAudio> {
    id: string;

    mute?: boolean;

    audios?: Audio[];

    fxs?: Fx[];

    context: AudioContext;
}

const ObservableProps = {
    id: observable,
    audios: observable,
    fxs: observable,
    _mute: observable,
    mute: computed,
    muteGainNode: observable,
    isPlaying: observable,
    duration: observable,
    context: observable,
    contextNode: computed,
    gain: observable,
    _volume: observable,
    volume: computed,
    panner: observable,
    _pan: observable,
    pan: computed,
    analyser: observable,
    play: action,
    stop: action,
    computePlayingStateByAudios: action,
    addAudio: action,
    removeAudio: action,
    addFx: action,
    removeFx: action,
    computeCurrentVolume: action,
    computeDuration: action,
    subscribeOnChangeDuration: action,
    observeThis: action,
    subscribeOnAudioDurationChange: action,
};

export class Track<Audio extends BaseAudio> {
    public readonly id: string;

    public audios: Audio[];

    public fxs: Fx[];

    private _mute: boolean;

    private muteGainNode: GainNode;

    public get mute(): boolean {
        return this._mute;
    }

    public set mute(value: boolean) {
        this.muteGainNode.gain.value = value ? 0 : 1;
        this._mute = value;
    }

    public isPlaying = false;

    public duration: number = 0;

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

        this.panner
            .connect(this.gain)
            .connect(this.analyser)
            .connect(this.muteGainNode);

        return this.muteGainNode;
    }

    protected readonly gain: GainNode;

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

    protected readonly panner: PannerNode;

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

    protected analyser: AnalyserNode;

    constructor({
        id,
        mute,
        audios,
        fxs,
        context,
    }: TrackConstructorProps<Audio>) {
        this.id = id;
        this.audios = audios ?? [];
        this.fxs = fxs ?? [];
        this.context = context;

        // basics fx
        this.muteGainNode = new GainNode(this.context);
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

        this.computePlayingStateByAudios();
        this.subscribeOnAudioDurationChange();
    }

    public play = (currentTime: number = 0): void => {
        if (this.mute) {
            return;
        }

        this.audios.forEach((audio) => {
            audio.play(currentTime);
        });
        this.computePlayingStateByAudios();
    };

    public stop = (): void => {
        this.audios.forEach((audio) => {
            audio.stop();
        });
        this.computePlayingStateByAudios();
    };

    protected computePlayingStateByAudios = (): void => {
        this.isPlaying = !isEmpty(
            this.audios.filter((audio) => audio.isPlaying),
        );
    };

    public addAudio = (audio: Audio): void => {
        this.audios.push(audio);
        this.subscribeOnAudioDurationChange();
    };

    public removeAudio = (audioId: string): void => {
        this.audios = this.audios.filter(({ id }) => id !== audioId);
        this.subscribeOnAudioDurationChange();
    };

    public addFx = (fx: Fx): void => {
        this.fxs.push(fx);
    };

    public removeFx = (fxId: string): void => {
        this.fxs = this.fxs.filter(({ id }) => id !== fxId);
    };

    public computeCurrentVolume = (): number => {
        const array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        return arraySum / array.length;
    };

    public subscribeOnChangeDuration = (callback: () => {}): void => {
        observe(this, 'duration', callback);
    };

    public computeDuration = (): number => {
        this.duration = this.audios.reduce(
            (duration, audio) =>
                Math.max(duration, audio.duration + audio.offset),
            0,
        );
        return this.duration;
    };

    protected observeThis = (): void => {
        makeObservable(this, ObservableProps);
        observe(this, 'audios', () => {
            this.computePlayingStateByAudios();
        });
    };

    protected subscribeOnAudioDurationChange = (): void => {
        this.audios.forEach((audio) => {
            audio.subscribeOnChangeDuration(this.computeDuration);
            audio.subscribeOnChangeOffset(this.computeDuration);
        });
    };
}
