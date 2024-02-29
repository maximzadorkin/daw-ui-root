import { useTheme } from '@quarx-ui/core';
import { Audio, Track } from '@shared/lib/audio-api';
import { ProjectControlsState } from '@shared/contexts/project-controls-context';

interface UseStateColor {
    border: string;

    background: string;
}

const useStateColor = (
    controls: ProjectControlsState,
    track: Track,
    audio: Audio,
): UseStateColor => {
    const {
        palette: { colors },
    } = useTheme();
    const border = colors[track.color].press;

    if (!audio.available) {
        return {
            border: colors.danger.press,
            background: colors.danger.default,
        };
    }

    if (controls.isSelectedAudio(audio.id)) {
        return { border, background: colors[track.color].default };
    }

    return { border, background: colors[track.color].weaker.min };
};

export { useStateColor };
