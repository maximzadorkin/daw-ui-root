import { ReactNode } from 'react';
import { Audio, Track } from '@shared/lib/audio-api';

interface AudioProps {
    /** @default 48 */
    height?: number;

    audio: Audio;

    track: Track;

    children?: ReactNode | ReactNode[];
}

export type { AudioProps };
