import { action, computed, makeObservable, observable, observe } from 'mobx';
import { AudioAnalyseWorker, AudioAnalyseWorkerEvents } from '@shared/workers';
import SecondaryToThreePoints from '@shared/audio/SecondaryToThreePoints';

export interface AudioConstructorProps {
    id: string;

    src: string;

    context: AudioContext;

    offset: number;
}

const ObservableProps = {
    id: observable,
    initialized: observable,
    _duration: observable,
    duration: computed,
    _offset: observable,
    offset: computed,
    isPlaying: observable,
    isPeaksAnalyse: observable,
    peaks: observable,
    source: observable,
    context: observable,
    audio: observable,
    node: observable,
    contextNode: computed,
    subscribeOnChangeDuration: action,
    subscribeOnChangeOffset: action,
    play: action,
    stop: action,
    computePeaks: action,
    initAudio: action,
    onInitialize: action,
    onAudioChanged: action,
    observeThis: action,
};

export class Audio {
    public readonly id: string;

    public initialized: boolean;

    private _duration: number;

    private _offset: number;

    public isPlaying: boolean;

    public isPeaksAnalyse: boolean;

    public peaks: Float32Array;

    protected readonly source: string;

    protected readonly context: AudioContext;

    protected audio: AudioBuffer;

    protected node: AudioBufferSourceNode | null;

    constructor({ id, src, context, offset }: AudioConstructorProps) {
        this.id = id;
        this.context = context;
        this.source = src;
        this.duration = 0;
        this._duration = this.duration;
        this.peaks = new Float32Array([]);
        this.audio = new AudioBuffer({ length: 1, sampleRate: 44100 });
        this.node = null;
        this.offset = offset ?? 0;
        this._offset = this.offset;
        this.isPlaying = false;
        this.isPeaksAnalyse = false;
        this.initialized = false;
        void this.initAudio().finally(this.onInitialize.bind(this));
    }

    public get contextNode(): AudioNode | null {
        return this.node as AudioNode | null;
    }

    public get offset(): number {
        return this._offset;
    }

    public set offset(value: number) {
        this._offset = Math.max(value, 0);
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(value: number) {
        this._duration = Math.max(value, 0);
    }

    public subscribeOnChangeDuration = (callback: () => void): void => {
        // Ошибка ts?
        // @ts-ignore
        observe(this, '_duration', callback);
    };

    public subscribeOnChangeOffset = (callback: () => void): void => {
        // Ошибка ts?
        // @ts-ignore
        observe(this, '_offset', callback);
    };

    public play = (currentPlayTime: number = 0): void => {
        if (this.isPlaying) {
            return;
        }

        this.node = this.context.createBufferSource();
        this.node.buffer = this.audio;

        if (currentPlayTime < this._offset) {
            this.node.start(
                this.context.currentTime + this._offset - currentPlayTime,
            );
        } else {
            this.node.start(0, currentPlayTime - this._offset);
        }

        this.isPlaying = true;
    };

    public stop = (): void => {
        this.node?.stop();
        this.node = null;
        this.isPlaying = false;
    };

    public computePeaks = async (onReady?: () => void): Promise<void> => {
        AudioAnalyseWorker.postMessage({
            type: AudioAnalyseWorkerEvents.CHANNEL_PEAKS_ANALYSER,
            // todo: неплохо бы вынести это для всего проекта
            length: new SecondaryToThreePoints().secondsToPoints(this.duration),
            audioBuffer: {
                length: this.audio.length,
                channel: this.audio.getChannelData(0), // just for 1 channel
            },
        });

        this.isPeaksAnalyse = true;

        const handleWorkerMessage = (message: MessageEvent) => {
            const isCurrentMessage =
                message.data.type ===
                AudioAnalyseWorkerEvents.CHANNEL_PEAKS_ANALYSER;

            if (isCurrentMessage) {
                this.peaks = message.data.data;
                this.isPeaksAnalyse = false;
                AudioAnalyseWorker.removeEventListener(
                    'message',
                    handleWorkerMessage,
                );
                onReady?.();
            }
        };

        AudioAnalyseWorker.addEventListener(
            'message',
            action(handleWorkerMessage),
        );
    };

    protected initAudio = async (): Promise<void> => {
        const data = await fetch(this.source);
        const downloadedBuffer = await data.arrayBuffer();
        const decoded = await this.context.decodeAudioData(downloadedBuffer);

        this.audio = decoded;
    };

    protected onInitialize = async (): Promise<void> => {
        this.duration = this.audio.duration;

        const setInit = () => {
            this.initialized = true;
        };

        await this.computePeaks(action(setInit.bind(this)));
    };

    protected onAudioChanged = async (): Promise<void> => {
        this.duration = this.audio.duration;
        await this.computePeaks();
    };

    protected observeThis = (): void => {
        makeObservable(this, ObservableProps);
    };
}
