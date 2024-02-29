import { ReactNode } from 'react';
import { RecordingAudio } from '@shared/lib/audio-api';

interface RecordingAudioProps {
    /** @default 48 */
    height?: number;

    audio: RecordingAudio;

    children?: ReactNode | ReactNode[];
}

export type { RecordingAudioProps };
