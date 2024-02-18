import { isEmpty } from 'lodash';
import { useProjectStore } from '@shared/stores';
import { SelectorOption } from '@shared/components/button-selector';

const useTrackInputOptions = (): SelectorOption[] => {
    const store = useProjectStore();

    return store.soundContext.mediaDevices.audioInputs.map(
        ({ label, deviceId }, index) => ({
            value: deviceId,
            title: isEmpty(label) ? `input ${index}` : label,
        }),
    );
};

export { useTrackInputOptions };
