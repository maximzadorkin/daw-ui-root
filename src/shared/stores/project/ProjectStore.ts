import { action, makeAutoObservable, observable } from 'mobx';
import { BaseStore } from '@shared/stores/base';
import { FxStore } from '../fx/FxStore';
import { TrackStore } from '../track/TrackStore';

export class ProjectStore implements BaseStore {
    @observable
    private id?: string;

    constructor(id?: string | null) {
        makeAutoObservable(this);

        this.id = id ?? undefined;
    }

    @observable
    private _playing: boolean = false;

    @observable
    public get isPlaying(): boolean {
        return this._playing;
    }

    @observable
    private recording: boolean = false;

    @observable
    public get isRecording(): boolean {
        return this.recording;
    }

    @observable tracks: TrackStore[] = [];

    public static readonly MIN_VOLUME = 0;
    public static readonly MAX_VOLUME = 130;
    public static readonly BASE_VOLUME = 100;

    @observable
    private volume: number = ProjectStore.BASE_VOLUME;

    public get currentVolume(): number {
        return this.volume;
    }

    @observable
    private _viewMixer: boolean = true;

    @observable
    public get viewMixer(): boolean {
        return this._viewMixer;
    }

    public set viewMixer(value: boolean) {
        this._viewMixer = value;
    }

    @observable
    private _viewFx?: FxStore;

    @observable
    public get viewFx(): FxStore | undefined {
        return this._viewFx;
    }

    public set viewFx(value: FxStore) {
        this._viewFx = value;
    }

    @action
    public play = (): void => {
        this._playing = true;
    };

    @action
    public pause = (): void => {
        this._playing = false;
    };

    @action
    public stop = (): void => {
        this._playing = false;
    };

    @action
    public record = (): void => {
        this.recording = true;
    };

    @action
    public stopRecord = (): void => {
        this.recording = false;
    };

    @action
    public setVolume = (percent: number): void => {
        if (percent <= ProjectStore.MIN_VOLUME) {
            this.volume = ProjectStore.MIN_VOLUME;
        } else if (percent >= ProjectStore.MAX_VOLUME) {
            this.volume = ProjectStore.MAX_VOLUME;
        }

        this.volume = Math.round(percent);
    };

    @action
    public addTrack = (track: TrackStore): void => {
        this.tracks.push(track);
    };

    @action
    public removeTrack = (removable: TrackStore): void => {
        this.tracks = this.tracks.filter(({ id }) => id !== removable.id);
    };

    @action
    public clear = (): void => {
        this.reset();
        this.id = undefined;
    };

    @action
    public reset = (): void => {
        this.volume = ProjectStore.BASE_VOLUME;
        this.recording = false;
        this._playing = false;
        this.viewMixer = true;
    };
}
