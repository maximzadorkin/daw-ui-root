import { ReactNode } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';
import { PaletteColor } from '@quarx-ui/core';

interface ButtonProps extends MeshProps {
    /** @default 24x24 */
    size?: THREE.Vector2;

    /** @default 4 */
    radius?: number;

    /** @default secondary */
    color?: PaletteColor;

    children: ReactNode;

    TextProps?: Partial<Parameters<typeof Text>[0]>;
}

export type { ButtonProps };
