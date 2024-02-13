import * as THREE from 'three';

interface DividerProps {
    position: [number, number, number];

    /** @default 1 */
    width?: number;

    /** @default 1 */
    height?: number;

    /** @default theme.border.main */
    color?: THREE.Color;
}

export type { DividerProps };
