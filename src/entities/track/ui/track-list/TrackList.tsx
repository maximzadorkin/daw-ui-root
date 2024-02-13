import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { observer } from 'mobx-react';
import { Group } from 'three';
import { useProjectStore } from '@shared/stores';
import { TrackShortInfoShape } from '../track-short-info-shape';
import { TrackListProps } from './types';

const TrackListComponent: ForwardRefRenderFunction<Group, TrackListProps> = (
    { position, trackHeight = 50, width = 220 },
    ref,
) => {
    const store = useProjectStore();

    return (
        <group ref={ref} position={position}>
            {store.tracks.map((track, index) => (
                <TrackShortInfoShape
                    track={track}
                    width={width}
                    height={trackHeight}
                    position={[0, -(trackHeight / 2) - trackHeight * index, 0]}
                />
            ))}
        </group>
    );
};

export const TrackList = observer(
    forwardRef<Group, TrackListProps>(TrackListComponent),
);
