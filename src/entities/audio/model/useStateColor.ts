import { useTheme } from '@quarx-ui/core';
import { AudioNodeStore, TrackStore } from '@shared/stores';

interface UseStateColor {
    border: string;

    background: string;
}

const useStateColor = (
    track: TrackStore,
    audioNode: AudioNodeStore,
): UseStateColor => {
    const {
        palette: { colors },
    } = useTheme();
    const border = colors[track.color].press;

    if (audioNode.userSelected) {
        return { border, background: colors[track.color].default };
    }

    if (audioNode.isRecording) {
        return { border, background: colors.danger.default };
    }

    return { border, background: colors[track.color].weaker.min };
};

export { useStateColor };
