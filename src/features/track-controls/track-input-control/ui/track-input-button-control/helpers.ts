import { isEmpty } from 'lodash';
import { SelectorOption } from '@shared/components/button-selector';
import { Track } from '@shared/lib/audio-context';

const useTrackInputOptions = (track: Track): SelectorOption[] =>
    track.mediaDevices.audioInputs.map(({ label, deviceId }) => ({
        value: deviceId,
        title: isEmpty(label) ? `Устройство ${deviceId}` : label,
    }));

export { useTrackInputOptions };
