import React, { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@quarx-ui/core';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { LoaderProps } from './types';

const Loader: FC<LoaderProps> = ({ position = [0, 0, 0], size = 24 }) => {
    const ref = useRef<THREE.Mesh>(null);
    const step = useRef<number>(0.01);
    const { palette } = useTheme();

    useEffect(() => {
        let interval = setInterval(() => {
            if (!ref.current) {
                return;
            }

            let currentScale = ref.current.scale.x + step.current;
            if (currentScale <= 0.5 || currentScale >= 1) {
                step.current = -step.current;
                currentScale += step.current;
            }

            ref.current.scale.x = currentScale;
            ref.current.scale.y = currentScale;
        }, 16);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <mesh ref={ref} position={position}>
            <circleGeometry args={[size / 2]} />
            <meshBasicMaterial
                color={convertQuarxColorToThreeJs(palette.text.main)}
                transparent
                opacity={0.5}
            />
        </mesh>
    );
};

export { Loader };
