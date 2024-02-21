import { useTheme } from '@quarx-ui/core';
import { Audio, Track } from '@shared/lib/audio-context';
import { useProjectControls } from '@shared/stores';

interface UseStateColor {
    border: string;

    background: string;
}

const useStateColor = (track: Track, audio: Audio): UseStateColor => {
    const {
        palette: { colors },
    } = useTheme();
    const controls = useProjectControls();
    const border = colors[track.color].press;

    if (controls.isSelectedAudio(audio.id)) {
        return { border, background: colors[track.color].default };
    }

    return { border, background: colors[track.color].weaker.min };
};

export { useStateColor };
