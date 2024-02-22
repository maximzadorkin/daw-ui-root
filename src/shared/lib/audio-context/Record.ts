import { action, makeObservable, observable } from 'mobx';
import { RecordingAudio } from './RecordingAudio';

type RecordSubscriber = (blobPart: BlobPart, allBlobParts: BlobPart[]) => void;

type StopRecordSubscriber = (audio: RecordingAudio) => void;

interface RecordConstructorProps {
    context: AudioContext;

    device: MediaStream;
}

export class Record {
    @observable
    public recorder: MediaRecorder;

    @observable
    private mediaDevice?: MediaStream;

    @observable
    private context: AudioContext;

    @observable
    public isRecording: boolean;

    @observable
    public contextNode: AudioNode;

    @observable
    private buffer?: RecordingAudio;

    @observable
    private recordSubscribers: RecordSubscriber[];

    @observable
    private stopRecordSubscriber: StopRecordSubscriber[];

    @observable
    public audios: RecordingAudio[];

    constructor({ context, device }: RecordConstructorProps) {
        makeObservable(this);

        this.context = context;
        this.mediaDevice = device;

        this.isRecording = false;
        this.audios = [];
        this.recorder = new MediaRecorder(this.mediaDevice);
        this.buffer = undefined;
        this.recordSubscribers = [];
        this.stopRecordSubscriber = [];
        this.contextNode = this.context.createMediaStreamSource(
            this.recorder.stream,
        );

        navigator.mediaDevices.addEventListener(
            'ondevicechange',
            this.onDeviceChange.bind(this),
        );
    }

    @action
    public start = (to: RecordingAudio): void => {
        if (!this.mediaDevice) {
            throw new Error('MediaDevice is undefined');
        }

        this.isRecording = true;
        this.buffer = to;
        this.audios.push(to);

        this.recorder?.start();

        this.recorder.addEventListener(
            'dataavailable',
            this.onRecorderDataAvailable,
        );

        // TODO: Очищать, без этого dataavailable не вызывается
        setInterval(() => {
            if (this.recorder.state === 'recording') {
                this.recorder.requestData();
            }
        }, 300);
        this.recorder.addEventListener('stop', this.onRecorderStopped);
    };

    @action
    private onRecorderDataAvailable = (event: BlobEvent): void => {
        // this.buffer?.blob.push(event.data);
        // ToDo: Как сделать просматриваемый
        if (this.buffer) {
            this.buffer.blob.push(event.data);
        }

        this.recordSubscribers.forEach((subscriber) => {
            subscriber(event.data, this.buffer?.blob ?? []);
        });
    };

    @action
    private onRecorderStopped = async () => {
        const blob = new Blob(this.buffer?.blob, { type: 'audio/mp3' });
        const buffer = this.buffer;
        this.isRecording = false;
        this.buffer = undefined;
        this.audios = this.audios.filter((audio) => audio.id !== buffer?.id);

        if (blob.size <= 0) {
            return;
        }

        this.stopRecordSubscriber.forEach((subscriber) => {
            if (buffer) {
                subscriber(buffer);
            }
        });
    };

    @action
    public stop = (): void => {
        this.recorder.stop();
    };

    @action
    public subscribeOnRecording = (callback: RecordSubscriber): void => {
        this.recordSubscribers.push(callback);
    };

    @action
    public subscribeOnStopRecording = (
        callback: StopRecordSubscriber,
    ): void => {
        this.stopRecordSubscriber.push(callback);
    };

    @action
    private onDeviceChange = (): void => {
        if (!this.mediaDevice?.active) {
            this.mediaDevice = undefined;
        }
    };
}
