import { action, autorun, makeObservable, observable, observe } from 'mobx';
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
        const buffer = await new Blob(this.blob).arrayBuffer();
        this.audio = await this.context.decodeAudioData(buffer);
    };

    @action
    public computePeaks = async (): Promise<void> => {
        if (!this.audio) {
            return;
        }

        AudioAnalyseWorker.postMessage({
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

        const handleWorkerMessage = (message: MessageEvent) => {
            const isCurrentMessage =
                message.data.type ===
                AudioAnalyseWorkerEvents.CHANNEL_PEAKS_ANALYSER;

            if (isCurrentMessage) {
                this.peaks = message.data.data;
                AudioAnalyseWorker.removeEventListener(
                    'message',
                    handleWorkerMessage,
                );
            }
        };

        AudioAnalyseWorker.addEventListener(
            'message',
            action(handleWorkerMessage),
        );
    };
}
