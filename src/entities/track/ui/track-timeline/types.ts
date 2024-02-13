import { ReactNode } from 'react';
import { TrackStore } from '@shared/stores';

interface TrackTimelineProps {
    track: TrackStore;

    position: [number, number, number];

    size: [number, number];

    children?: ReactNode | ReactNode[];
}

export type { TrackTimelineProps };
