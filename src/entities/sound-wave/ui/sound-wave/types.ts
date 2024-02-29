import { Audio, RecordingAudio } from '@shared/lib/audio-api';

interface SoundWaveProps {
    /** @default [0, 0, 0] */
    position?: [number, number, number];

    height: number;

    audio: Audio | RecordingAudio;
}

export type { SoundWaveProps };
