import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { observer } from 'mobx-react';
import { Group } from 'three';
import { TrackViewModel, useProjectViewModel } from '@shared/stores';
import { TrackShortInfoShape } from '../track-short-info-shape';
import { TrackListProps } from './types';

const TrackListComponent: ForwardRefRenderFunction<Group, TrackListProps> = (
    { position, trackHeight = 50, width = 220 },
    ref,
) => {
    const store = useProjectViewModel();

    const renderShorts = (track: TrackViewModel, index: number) => (
        <TrackShortInfoShape
            key={track.id}
            track={track}
            width={width}
            height={trackHeight}
            position={[0, -(trackHeight / 2) - trackHeight * index, 0]}
        />
    );

    return (
        <group ref={ref} position={position}>
            {store.tracks.map(renderShorts)}
        </group>
    );
};

export const TrackList = observer(
    forwardRef<Group, TrackListProps>(TrackListComponent),
);
