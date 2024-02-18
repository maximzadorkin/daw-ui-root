import React, { FC, forwardRef } from 'react';
import { useTheme } from '@quarx-ui/core';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import * as THREE from 'three';
import { DividerProps } from './types';

const Divider = forwardRef<THREE.Mesh, DividerProps>(
    ({ position, width = 1, height = 1, color }, ref) => {
        const { palette } = useTheme();

        return (
            <mesh ref={ref} position={position}>
                <boxGeometry args={[width, height]} />
                <meshBasicMaterial
                    opacity={1}
                    color={
                        color ?? convertQuarxColorToThreeJs(palette.border.main)
                    }
                />
            </mesh>
        );
    },
);

export { Divider };
