import { makeAutoObservable } from 'mobx';
import { BaseStore } from '@shared/stores/base';

class ProjectStore implements BaseStore {
    constructor() {
        makeAutoObservable(this);
    }

    private playing: boolean = false;
    private recording: boolean = false;

    public static readonly MIN_VOLUME = 0;
    public static readonly MAX_VOLUME = 130;
    public static readonly BASE_VOLUME = 100;
    private volume: number = ProjectStore.BASE_VOLUME;

    public get isPlaying(): boolean {
        return this.playing;
    }

    public get isRecording(): boolean {
        return this.recording;
    }

    public play = (): void => {
        this.playing = true;
    };

    public pause = (): void => {
        this.playing = false;
    };

    public stop = (): void => {
        this.playing = false;
    };

    public record = (): void => {
        this.recording = true;
    };

    public stopRecord = (): void => {
        this.recording = false;
    };

    public get currentVolume(): number {
        return this.volume;
    }

    public setVolume = (percent: number): void => {
        if (percent <= ProjectStore.MIN_VOLUME) {
            this.volume = ProjectStore.MIN_VOLUME;
        } else if (percent >= ProjectStore.MAX_VOLUME) {
            this.volume = ProjectStore.MAX_VOLUME;
        }

        this.volume = Math.round(percent);
    };

    public clear = (): void => {};

    public reset = (): void => {};
}

const projectStore = new ProjectStore();

export { projectStore, ProjectStore };
