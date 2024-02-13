import React, { FC } from 'react';
import { useTheme } from '@quarx-ui/core';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { DividerProps } from './types';

const Divider: FC<DividerProps> = ({
    position,
    width = 1,
    height = 1,
    color,
}) => {
    const { palette } = useTheme();

    return (
        <mesh position={position}>
            <boxGeometry args={[width, height]} />
            <meshBasicMaterial
                opacity={1}
                color={color ?? convertQuarxColorToThreeJs(palette.border.main)}
            />
        </mesh>
    );
};

export { Divider };
