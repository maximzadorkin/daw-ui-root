import { Ref } from 'react';
import { Group } from 'three';

interface TrackListProps {
    ref?: Ref<Group>;

    position: [number, number, number];

    trackHeight?: number;

    width?: number;
}

export type { TrackListProps };
