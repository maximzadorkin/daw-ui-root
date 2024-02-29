import { createID } from '@quarx-ui/core';
import { isNil } from 'lodash';
import { action, makeObservable, observable, observe } from 'mobx';
import { AudioAnalyseWorker, AudioAnalyseWorkerEvents } from '@shared/workers';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';
import { filesStorage } from '../../stores';

enum InitType {
    link,
    storage,
}

interface AudioSource {
    link: string;

    sha: string;

    /** Если передан - будет преимущественно отсюда инициализирован */
    buffer?: ArrayBuffer;

    relatedInfo: {
        projectId: string;

        trackId: string;
    };
}

export interface AudioConstructorProps {
    id: string;

    context: AudioContext;

    src: AudioSource;

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
    private readonly context: AudioContext;

    @observable
    private audio: AudioBuffer;

    @observable
    public readonly source: AudioSource;

    @observable
    private node: AudioBufferSourceNode | null;

    @observable
    public available: boolean;

    constructor({ id, context, src, offset }: AudioConstructorProps) {
        makeObservable(this);

        this.id = id;
        this.context = context;

        this.duration = 0;
        this._duration = this.duration;
        this.peaks = new Float32Array([]);

        this.node = null;
        this.offset = offset ?? 0;
        this._offset = this.offset;
        this.isPlaying = false;
        this.isPeaksAnalyse = false;

        this.audio = new AudioBuffer({ length: 1, sampleRate: 44100 });

        this.initialized = false;
        this.available = true;
        this.source = src;
        void this.initAudio(InitType.storage);
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
    private initAudio = async (type: InitType): Promise<void> => {
        if (type === InitType.link) {
            try {
                const data = await fetch(this.source.link);
                const buffer = await data.arrayBuffer();

                const audioData = new ArrayBuffer(buffer.byteLength);
                new Uint8Array(audioData).set(new Uint8Array(buffer));
                this.audio = await this.context.decodeAudioData(audioData);
                this.available = true;
                console.info(`Аудио ${this.id} успешно загружено с сервера`);

                try {
                    void filesStorage.addAudio(
                        this.source.relatedInfo.projectId,
                        this.source.relatedInfo.trackId,
                        this.id,
                        buffer,
                    );
                    console.info(
                        [
                            'Аудио',
                            this.id,
                            'успешно записано в хранилище. размер:',
                            buffer.byteLength / 1024 / 1024,
                            'мб.',
                        ].join(' '),
                    );
                } catch {
                    console.error(
                        `Не удалось сохранить аудио ${this.id} в локальное хранилище`,
                    );
                }
            } catch {
                console.error(
                    'Аудио не может быть инициализировано через ссылку',
                );
                this.available = false;
            }
        } else if (type === InitType.storage) {
            try {
                const buffer =
                    this.source.buffer ??
                    (await filesStorage.getAudio(
                        this.source.relatedInfo.projectId,
                        this.source.relatedInfo.trackId,
                        this.id,
                        this.source.sha,
                    ));

                if (isNil(buffer) || buffer.byteLength === 0) {
                    console.error(
                        'Возможно при получении данных произошла ошибка',
                    );
                    this.available = false;
                    void this.initAudio(InitType.link);
                    return;
                }

                this.audio = await this.context.decodeAudioData(buffer);
                this.available = true;
                console.info(`Аудио ${this.id} успешно загружено из хранилища`);
            } catch {
                console.error(
                    'Аудио не может быть инициализировано через кеш хранилище',
                );
                this.available = false;
                void this.initAudio(InitType.link);
                return;
            }
        } else {
            this.available = false;
        }

        await this.onInitialize();
    };

    @action
    private onInitialize = async (): Promise<void> => {
        this.duration = this.audio.duration;

        const setInit = action(() => {
            this.initialized = true;
        });

        await this.computePeaks(setInit.bind(this));
    };
}
