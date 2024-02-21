import { ReactNode } from 'react';
import { RecordingAudio } from '@shared/lib/audio-context';

interface RecordingAudioProps {
    /** @default 48 */
    height?: number;

    audio: RecordingAudio;

    children?: ReactNode | ReactNode[];
}

export type { RecordingAudioProps };
