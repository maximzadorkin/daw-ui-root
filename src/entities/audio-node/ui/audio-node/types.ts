import { ReactNode } from 'react';
import { AudioNodeStore, TrackStore } from '@shared/stores';

interface AudioNodeProps {
    /** @default 48 */
    height?: number;

    audioNode: AudioNodeStore;

    track: TrackStore;

    children?: ReactNode | ReactNode[];
}

export type { AudioNodeProps };
