import { action, makeAutoObservable, observable } from 'mobx';
import { BaseStore } from '@shared/stores/base';

export class ProjectStore implements BaseStore {
    @observable
    private id?: string;

    constructor(id?: string | null) {
        makeAutoObservable(this);

        this.id = id ?? undefined;
    }

    @observable
    private playing: boolean = false;

    @observable
    private recording: boolean = false;

    public static readonly MIN_VOLUME = 0;
    public static readonly MAX_VOLUME = 130;
    public static readonly BASE_VOLUME = 100;

    @observable
    private volume: number = ProjectStore.BASE_VOLUME;

    @observable
    public viewMixer: boolean = false;

    public get isPlaying(): boolean {
        return this.playing;
    }

    public get isRecording(): boolean {
        return this.recording;
    }

    public get currentVolume(): number {
        return this.volume;
    }

    @action
    public play = (): void => {
        this.playing = true;
    };

    @action
    public pause = (): void => {
        this.playing = false;
    };

    @action
    public stop = (): void => {
        this.playing = false;
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
    public clear = (): void => {
        this.reset();
        this.id = undefined;
    };

    @action
    public reset = (): void => {
        this.volume = ProjectStore.BASE_VOLUME;
        this.recording = false;
        this.playing = false;
        this.viewMixer = false;
    };
}
