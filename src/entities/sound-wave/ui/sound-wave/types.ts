import { AudioViewModel } from '@shared/stores';

interface SoundWaveProps {
    /** @default [0, 0, 0] */
    position?: [number, number, number];

    height: number;

    audio: AudioViewModel;
}

export type { SoundWaveProps };
