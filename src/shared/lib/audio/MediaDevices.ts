import { action, makeAutoObservable, observable } from 'mobx';

class MediaDevices {
    private audioInputDevices: InputDeviceInfo[];
    private loading: boolean = false;
    private subscribers: (() => void | Promise<void>)[];

    constructor() {
        makeAutoObservable(this);
        this.audioInputDevices = [];
        this.subscribers = [];
        navigator.mediaDevices.ondevicechange = this.onDeviceChange.bind(this);
        void this.initDevices().then(this.setLoaded.bind(this));
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

    @observable
    private onDeviceChange = async (): Promise<void> => {
        await this.initDevices();
        this.subscribers.forEach((callback) => {
            callback();
        });
    };

    @observable
    public get audioInputs(): InputDeviceInfo[] {
        return this.audioInputDevices;
    }

    @observable
    public get loaded(): boolean {
        return this.loading;
    }

    @observable
    private setLoaded(): void {
        this.loading = true;
    }

    @action
    private initDevices = async (): Promise<void> => {
        this.audioInputDevices = await this.getAudioInputDevices();
    };

    @action
    private getDevices = (): Promise<MediaDeviceInfo[]> =>
        navigator.mediaDevices?.enumerateDevices?.();

    @action
    private getDevicesMap = async (): Promise<
        Record<string, MediaDeviceInfo>
    > => {
        const devices = await this.getDevices();

        return devices.reduce(
            (acc, device) => ({
                ...acc,
                [device.deviceId]: device,
            }),
            {},
        );
    };

    @action
    private isInputAudioDevice = <T extends MediaDeviceInfo>(
        device: T | InputDeviceInfo,
    ): device is InputDeviceInfo => {
        return device.kind === 'audioinput';
    };

    @action
    private getAudioInputDevices = async (): Promise<InputDeviceInfo[]> => {
        const allDevicesMap = await this.getDevicesMap();
        const allDevices = await this.getDevices();
        const allDeviceIds = [
            ...new Set(allDevices.map(({ deviceId }) => deviceId)),
        ];

        return allDeviceIds
            .map((id) => allDevicesMap[id])
            .filter(Boolean)
            .filter(this.isInputAudioDevice);
    };

    @action
    public getMedia = async (input: InputDeviceInfo): Promise<MediaStream> => {
        return await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: input.deviceId },
        });
    };
}

export { MediaDevices };
