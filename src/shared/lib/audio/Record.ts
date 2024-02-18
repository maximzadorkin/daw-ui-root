import { action, makeAutoObservable, observable } from 'mobx';
import { MediaDevices } from './MediaDevices';

export class Record {
    @observable
    private recorders: MediaRecorder[];

    @observable
    private mediaDevices: MediaDevices;

    @observable
    private state: Map<MediaRecorder, HTMLAudioElement>;

    @observable
    public initialized: boolean;

    @observable
    public isRecording: boolean;

    constructor(devices: MediaDevices) {
        makeAutoObservable(this);
        this.initialized = false;

        this.mediaDevices = devices;
        this.initRecorders().finally(() => (this.initialized = true));
        this.mediaDevices.subscribeOnChange(this.initRecorders.bind(this));

        this.isRecording = false;
        this.state = new Map();
        this.recorders = [];
    }

    @observable
    public get availableRecorders(): MediaRecorder[] {
        return this.recorders;
    }

    @action
    private initRecorders = async (): Promise<void> => {
        for (
            let index = 0;
            index < this.mediaDevices.audioInputs.length;
            index += 1
        ) {
            await this.initRecorder(this.mediaDevices.audioInputs[index]);
        }
    };

    @action
    private initRecorder = async (
        audioInput: InputDeviceInfo,
    ): Promise<void> => {
        const device = await this.mediaDevices.getMedia(audioInput);
        const recorder = new MediaRecorder(device);

        if (device && recorder) {
            this.recorders.push(recorder);
        }
    };

    @action
    public start = (recorders: MediaRecorder[]): void => {
        this.isRecording = true;
        this.state = new Map();
        console.log(recorders);
        recorders.map(this.startRecord);
    };

    @action
    private startRecord = (recorder: MediaRecorder): void => {
        recorder?.start();

        const buffer: BlobPart[] = [];

        recorder.addEventListener('dataavailable', (event) => {
            buffer.push(event.data);
        });

        recorder.addEventListener('stop', () => {
            const blob = new Blob(buffer, { type: 'audio/mp3' });
            console.log('blob', blob);

            if (blob.size <= 0) {
                return;
            }

            const audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            this.state.set(recorder, audio);
        });
    };

    @action
    public stop = (): Map<MediaRecorder, HTMLAudioElement> => {
        this.recorders.map(this.stopRecord);
        this.isRecording = false;
        return this.state;
    };

    @action
    private stopRecord = (recorder: MediaRecorder): void => {
        recorder.stop();
    };
}
