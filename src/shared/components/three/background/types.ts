import { ReactNode } from 'react';
import * as THREE from 'three';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';

interface BackgroundProps {
    /** [x, y, z] */
    position: [number, number, number];

    /** [width, height] */
    size: [number, number];

    children?: ReactNode | ReactNode[];

    /** @default background.main */
    color?: THREE.Color;

    meshProps?: Omit<Partial<MeshProps>, 'position'>;
}

export type { BackgroundProps };
