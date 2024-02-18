import React, { FC } from 'react';
import { useTheme } from '@quarx-ui/core';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { BackgroundProps } from './types';

const Background: FC<BackgroundProps> = ({
    size,
    position,
    children,
    color: externalColor,
    meshProps,
}) => {
    const { palette } = useTheme();
    const color = convertQuarxColorToThreeJs(palette.background.main);

    return (
        <mesh position={position} {...meshProps}>
            <boxGeometry args={size} />
            <meshBasicMaterial color={externalColor ?? color} />
            {children}
        </mesh>
    );
};

export { Background };
