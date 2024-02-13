import React, { FC } from 'react';
import { useTheme } from '@quarx-ui/core';
import { observer } from 'mobx-react';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { createSoundWaveShapeFromArray } from '../../model/createSoundWaveShapeFromArray';
import { SoundWaveProps } from './types';

const SoundWaveComponent: FC<SoundWaveProps> = ({
    audioNode,
    position = [0, 0, 0],
}) => {
    const { palette } = useTheme();
    const shapes = createSoundWaveShapeFromArray({
        fromX: position[0],
        fromY: position[1],
        step: 1,
        array: [
            5, 10, 3, 15, 20, 1, 0, 16, 20, 0, 5, 10, 3, 15, 20, 1, 0, 16, 20,
            0, 5, 10, 3, 15, 20, 1, 0, 16, 20, 0,
        ],
    });

    return (
        <mesh position={position}>
            <meshBasicMaterial
                color={convertQuarxColorToThreeJs(palette.background.main)}
            />
            <shapeGeometry args={[[shapes.default, shapes.inversed]]} />
        </mesh>
    );
};

export const SoundWave = observer(SoundWaveComponent);
