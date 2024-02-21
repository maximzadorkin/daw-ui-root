import { uniqWith } from 'lodash';
import { action, makeObservable, observable } from 'mobx';

class MediaDevices {
    @observable
    private audioInputDevices: InputDeviceInfo[];

    @observable
    public initialized: boolean = false;

    @observable
    private subscribers: (() => void | Promise<void>)[];

    constructor() {
        makeObservable(this);

        this.audioInputDevices = [];
        this.subscribers = [];
        navigator.mediaDevices.ondevicechange = this.onDeviceChange.bind(this);
        void this.initDevices().then(action(() => (this.initialized = true)));
    }

    @action
    public subscribeOnChange = (callback: () => void | Promise<void>): void => {
        this.subscribers.push(callback);
        navigator.mediaDevices.ondevicechange = () => {};
    };

    @action
    public unsubscribeOnChange = (
        callback: () => void | Promise<void>,
    ): void => {
        this.subscribers = this.subscribers.filter((val) => val !== callback);
    };

    @action
    private onDeviceChange = async (): Promise<void> => {
        await this.initDevices();
        this.subscribers.forEach((callback) => {
            callback();
        });
    };

    public get audioInputs(): InputDeviceInfo[] {
        return this.audioInputDevices;
    }

    @action
    private initDevices = async (): Promise<void> => {
        this.audioInputDevices = await this.getAudioInputDevices();
    };

    @action
    private getDevices = async (): Promise<MediaDeviceInfo[]> => {
        return await navigator.mediaDevices?.enumerateDevices?.();
    };

    @action
    private isInputAudioDevice = <T extends MediaDeviceInfo>(
        device: T | InputDeviceInfo,
    ): device is InputDeviceInfo => {
        return device.kind === 'audioinput';
    };

    @action
    private getAudioInputDevices = async (): Promise<InputDeviceInfo[]> => {
        const allDevices = await this.getDevices();
        const audioDevices = allDevices.filter(this.isInputAudioDevice);

        return uniqWith(
            audioDevices,
            ({ deviceId: id1 }, { deviceId: id2 }) => id1 !== id2,
        ).filter(Boolean);
    };

    @action
    public getMedia = async (input: InputDeviceInfo): Promise<MediaStream> => {
        return await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: input?.deviceId,
                noiseSuppression: false,
                autoGainControl: false,
                // echoCancellation: false,
                channelCount: 1,
            },
        });
    };
}

export { MediaDevices };
