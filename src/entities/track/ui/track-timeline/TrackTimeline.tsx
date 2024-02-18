import React, { FC } from 'react';
import { useTheme } from '@quarx-ui/core';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { Divider } from '@shared/components/three/divider';
import { TrackTimelineProps } from './types';

const qxToThree = convertQuarxColorToThreeJs;

const TrackTimeline: FC<TrackTimelineProps> = ({
    position,
    size = [100, 48],
    children,
}) => {
    const [width, height] = size;
    const {
        palette: { background },
    } = useTheme();

    return (
        <group position={position}>
            <Divider position={[0, height / 2, 0]} height={1} width={width} />
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={size} />
                <meshBasicMaterial color={qxToThree(background.main)} />

                <group position={[-(width / 2), 0, position[2]]}>
                    {children}
                </group>
            </mesh>
            <Divider position={[0, -height / 2, 0]} height={1} width={width} />
        </group>
    );
};

export { TrackTimeline };
