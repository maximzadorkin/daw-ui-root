import { AudioNodeStore } from '@shared/stores/audio-node/AudioNodeStore';

interface SoundWaveProps {
    /** @default [0, 0, 0] */
    position?: [number, number, number];

    audioNode: AudioNodeStore;
}

export type { SoundWaveProps };
