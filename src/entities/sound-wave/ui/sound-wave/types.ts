import { Audio, RecordingAudio } from '@shared/lib/audio-context';

interface SoundWaveProps {
    /** @default [0, 0, 0] */
    position?: [number, number, number];

    height: number;

    audio: Audio | RecordingAudio;
}

export type { SoundWaveProps };
