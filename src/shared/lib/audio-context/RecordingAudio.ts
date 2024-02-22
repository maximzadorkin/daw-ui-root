import { createID } from '@quarx-ui/core';
import { action, makeObservable, observable, observe, runInAction } from 'mobx';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';
import { AudioAnalyseWorker, AudioAnalyseWorkerEvents } from '../../workers';

export class RecordingAudio {
    @observable
    public readonly id: string;

    @observable
    public readonly context: AudioContext;

    @observable
    public offset: number = 0;

    @observable
    public blob: BlobPart[];

    @observable
    public audio?: AudioBuffer;

    @observable
    public peaks: Float32Array;

    constructor({
        id,
        offset = 0,
        context,
    }: {
        id: string;
        offset?: number;
        context: AudioContext;
    }) {
        makeObservable(this);

        this.id = id;
        this.offset = offset;
        this.context = context;
        this.blob = [];
        this.peaks = new Float32Array();

        observe(this, 'blob', this.onBlobUpdate);
    }

    @action
    private onBlobUpdate = async (): Promise<void> => {
        await this.computeDuration();
        await this.computePeaks();
    };

    @observable
    private computeDuration = async (): Promise<void> => {
        try {
            const buffer = await new Blob(this.blob).arrayBuffer();
            const audio = await this.context.decodeAudioData(buffer);
            runInAction(() => (this.audio = audio));
        } finally {
        }
    };

    @action
    public computePeaks = async (): Promise<void> => {
        if (!this.audio) {
            return;
        }

        const applicationId = createID();
        AudioAnalyseWorker.postMessage({
            id: applicationId,
            type: AudioAnalyseWorkerEvents.CHANNEL_PEAKS_ANALYSER,
            // todo: неплохо бы вынести это для всего проекта
            length: new SecondaryToThreePoints().secondsToPoints(
                this.audio?.duration,
            ),
            audioBuffer: {
                length: this.audio.length,
                channel: this.audio.getChannelData(0), // just for 1 channel
            },
        });

        const handleWorkerMessage = action((message: MessageEvent) => {
            const isCurrentMessage =
                message.data.id === applicationId &&
                message.data.type ===
                    AudioAnalyseWorkerEvents.CHANNEL_PEAKS_ANALYSER;

            if (isCurrentMessage) {
                this.peaks = message.data.data;
                AudioAnalyseWorker.removeEventListener(
                    'message',
                    handleWorkerMessage,
                );

                AudioAnalyseWorker.removeEventListener(
                    'message',
                    handleWorkerMessage,
                );
            }
        });

        AudioAnalyseWorker.addEventListener('message', handleWorkerMessage);
    };
}
