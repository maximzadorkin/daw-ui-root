import React, { FC, useRef } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { VerticalScrollableProps } from './types';

const VerticalScrollable: FC<VerticalScrollableProps> = ({
    children: Component,
}) => {
    const scroll = useScroll();
    const sceneSize = useThree(({ size }) => size);
    const ref = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!ref.current) {
            return;
        }

        const oldY = ref.current.position.y;
        const newY = sceneSize.height * scroll.pages * scroll.offset;
        if (newY !== oldY) {
            ref.current.position.y = newY;
            ref.current.updateMatrixWorld();
        }
    });

    return <group ref={ref}>{Component}</group>;
};

export { VerticalScrollable };
