import { useTheme } from '@quarx-ui/core';
import { AudioNodeStore, TrackStore } from '@shared/stores';

const useStateColor = (
    track: TrackStore,
    audioNode: AudioNodeStore,
): string => {
    const {
        palette: { colors },
    } = useTheme();

    if (audioNode.userSelected) {
        return colors[track.color].press;
    }

    if (audioNode.isRecording) {
        return colors.danger.default;
    }

    return colors[track.color].default;
};

export { useStateColor };
