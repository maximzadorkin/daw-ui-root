import { ReactNode } from 'react';
import { Track } from '@shared/lib/audio-context';

interface TrackTimelineProps {
    track: Track;

    position: [number, number, number];

    size: [number, number];

    children?: ReactNode | ReactNode[];
}

export type { TrackTimelineProps };
