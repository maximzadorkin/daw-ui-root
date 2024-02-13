import { PALETTE_COLORS, PaletteColor, PaletteColors } from '@quarx-ui/core';
import { isUndefined } from 'lodash';
import { action, makeAutoObservable, observable } from 'mobx';
import { AudioNodeStore } from '../audio-node/AudioNodeStore';
import { FxStore } from '../fx/FxStore';

enum TrackType {
    audio = 'audio',
    midi = 'midi',
}

class TrackStore {
    @observable
    public id: string;

    @observable
    public name: string;

    @observable
    public type: TrackType;

    // При создании брать первый из текущих вариантов. Брать из хранилища
    @observable
    public input?: string;

    @observable
    public isRecording: boolean;

    @observable
    public color: Exclude<PaletteColor, 'danger'>;

    @observable
    private _volume: number;

    public static readonly MAX_VOLUME = 5;
    public static readonly MIN_VOLUME = -100;
    public static readonly DEFAULT_VOLUME = 0;

    @observable
    public get volume(): number {
        return this._volume;
    }

    public set volume(value: number) {
        const tmp = Math.min(TrackStore.MAX_VOLUME, value);
        this._volume = Math.max(TrackStore.MIN_VOLUME, tmp);
    }

    @observable
    private _playedVolume?: number;

    @observable
    public get playedVolume(): number | undefined {
        return this._playedVolume;
    }

    public set playedVolume(value: number | undefined) {
        if (isUndefined(value)) {
            this._playedVolume = undefined;
            return;
        }

        const tmp = Math.min(TrackStore.MAX_VOLUME, value);
        this._playedVolume = Math.max(TrackStore.MIN_VOLUME, tmp);
    }

    @observable
    private _pan: number;

    public static readonly MAX_RIGHT_PAN = 1;
    public static readonly MAX_LEFT_PAN = -1;
    public static readonly DEFAULT_PAN = 0;

    @observable
    public get pan(): number {
        return this._pan;
    }

    public set pan(value: number) {
        const tmp = Math.min(TrackStore.MAX_RIGHT_PAN, value);
        this._pan = Math.max(TrackStore.MAX_LEFT_PAN, tmp);
    }

    @observable
    public fxs: FxStore[];

    @observable
    public mute: boolean = false;

    @observable audioNodes: AudioNodeStore[];

    constructor(id: string, type: TrackType, name: string) {
        makeAutoObservable(this);

        this.id = id;
        this.type = type ?? TrackType.audio;
        this.name = name;
        this._pan = TrackStore.DEFAULT_PAN;
        this._volume = TrackStore.DEFAULT_VOLUME;
        this.fxs = [];
        this.audioNodes = [];
        this.isRecording = false;

        this.color = Object.values(PALETTE_COLORS).filter(
            (v) => v !== 'danger',
        )[
            Math.min(Math.max(Math.ceil(Math.random() * 5) - 1, 0), 5)
        ] as unknown as Exclude<PaletteColor, 'danger'>;
    }

    @action
    public addFx = (fx: FxStore): void => {
        this.fxs.push(fx);
    };

    @action
    public removeFx = (removable: FxStore): void => {
        this.fxs = this.fxs.filter((fx) => fx !== removable);
    };

    @action
    public addAudioNode = (audioNode: AudioNodeStore): void => {
        this.audioNodes.push(audioNode);
    };

    @action
    public removeAudioNode = (removable: AudioNodeStore): void => {
        this.audioNodes = this.audioNodes.filter(
            (audioNode) => audioNode !== removable,
        );
    };
}

export { TrackType, TrackStore };
