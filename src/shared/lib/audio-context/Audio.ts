import { createID } from '@quarx-ui/core';
import isString from 'lodash/isString';
import { action, makeObservable, observable, observe } from 'mobx';
import { AudioAnalyseWorker, AudioAnalyseWorkerEvents } from '@shared/workers';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';

export interface AudioConstructorProps {
    id: string;

    src: string | AudioBuffer;

    context: AudioContext;

    offset: number;
}

export class Audio {
    @observable
    public readonly id: string;

    @observable
    public initialized: boolean;

    @observable
    private _duration: number;

    @observable
    private _offset: number;

    @observable
    public isPlaying: boolean;

    @observable
    public isPeaksAnalyse: boolean;

    @observable
    public peaks: Float32Array;

    @observable
    protected source: string | AudioBuffer;

    @observable
    protected readonly context: AudioContext;

    @observable
    protected audio: AudioBuffer;

    @observable
    protected node: AudioBufferSourceNode | null;

    constructor({ id, src, context, offset }: AudioConstructorProps) {
        makeObservable(this);

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

    @action
    public subscribeOnChangeDuration = (callback: () => void): void => {
        // @ts-expect-error
        observe(this, '_duration', callback);
    };

    @action
    public subscribeOnChangeOffset = (callback: () => void): void => {
        // @ts-expect-error
        observe(this, '_offset', callback);
    };

    @action
    public play = (
        contextTime: number = 0,
        currentPlayTime: number = 0,
    ): void => {
        if (this.isPlaying) {
            return;
        }

        this.node = this.context.createBufferSource();
        this.node.buffer = this.audio;

        if (currentPlayTime < this._offset) {
            this.node.start(contextTime + this._offset - currentPlayTime);
        } else {
            this.node.start(0, currentPlayTime - this._offset);
        }

        this.isPlaying = true;
    };

    @action
    public stop = (): void => {
        this.node?.stop();
        this.node = null;
        this.isPlaying = false;
    };

    @action
    public computePeaks = async (onReady?: () => void): Promise<void> => {
        const applicationId = createID();
        AudioAnalyseWorker.postMessage({
            id: applicationId,
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
                message.data.id === applicationId &&
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

                AudioAnalyseWorker.removeEventListener(
                    'message',
                    handleWorkerMessage,
                );
            }
        };

        AudioAnalyseWorker.addEventListener('message', handleWorkerMessage);
    };

    @action
    protected initAudio = async (): Promise<void> => {
        if (isString(this.source)) {
            try {
                const data = await fetch(this.source);
                const downloadedBuffer = await data.arrayBuffer();
                this.audio =
                    await this.context.decodeAudioData(downloadedBuffer);
            } finally {
            }
        } else {
            this.audio = this.source;
        }
    };

    @action
    public readFromAudioBuffer = async (buffer: AudioBuffer): Promise<void> => {
        this.initialized = false;
        this.source = buffer;
        this.initAudio().finally(this.onInitialize);
    };

    @action
    protected onInitialize = async (): Promise<void> => {
        this.duration = this.audio.duration;

        const setInit = action(() => {
            this.initialized = true;
        });

        await this.computePeaks(setInit.bind(this));
    };

    @action
    protected onAudioChanged = async (): Promise<void> => {
        this.duration = this.audio.duration;
        await this.computePeaks();
    };
}
