import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { SelectorOption } from '@shared/components/button-selector';

// Лучше сделать полноценное хранилище для этого + добавить ошибку
// + await navigator.mediaDevices.ondevicechange
const getDevices = () => navigator.mediaDevices?.enumerateDevices?.();

const isInputAudioDevice = <T extends MediaDeviceInfo>(
    device: T | InputDeviceInfo,
): device is InputDeviceInfo => {
    return device.kind === 'audioinput';
};

const getAudioInputDevices = async (): Promise<InputDeviceInfo[]> => {
    const allDevices = await getDevices();
    return allDevices.filter(isInputAudioDevice);
};

// todo: просто использовать из стора все девайсы
const useTrackInputOptions = (): SelectorOption[] => {
    const [devices, setDevices] = useState<InputDeviceInfo[]>([]);

    useEffect(() => {
        getAudioInputDevices().then(setDevices);
    }, []);

    return devices.map(({ label }, index) => ({
        value: isEmpty(label) ? `input ${index}` : label,
        title: isEmpty(label) ? `input ${index}` : label,
    }));
};

export { useTrackInputOptions };
