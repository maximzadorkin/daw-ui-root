import { ReactNode } from 'react';
import { TrackViewModel } from '@shared/stores';

interface TrackTimelineProps {
    track: TrackViewModel;

    position: [number, number, number];

    size: [number, number];

    children?: ReactNode | ReactNode[];
}

export type { TrackTimelineProps };
