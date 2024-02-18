import React, { FC, useRef } from 'react';
import * as THREE from 'three';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { HorizontalScrollableProps } from './types';
import { observer } from 'mobx-react';

const HorizontalScrollable: FC<HorizontalScrollableProps> = observer(
    ({ pages = 1, size: externalSize, children: Component }) => {
        const sceneSize = useThree(({ size }) => size);
        const ref = useRef<THREE.Group>(null);
        const size = externalSize ?? sceneSize.width;
        const minimumX = 0;
        const maximumX = -(size * pages) + size;

        const onWheel = (event: ThreeEvent<WheelEvent>): void => {
            if (!ref.current) {
                return;
            }

            const oldX = ref.current.position.x;
            const newX = oldX - event.deltaX;

            const isXScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);

            if (newX !== oldX && isXScroll) {
                const isMaximum = newX <= maximumX;
                const isMinimum = newX >= minimumX;

                if (isMinimum) {
                    ref.current.position.x = minimumX;
                } else if (isMaximum) {
                    ref.current.position.x = maximumX;
                } else {
                    ref.current.position.x = newX;
                }

                ref.current.updateMatrixWorld();
            }
        };

        return (
            <group ref={ref} position={[0, 0, 0]} onWheel={onWheel}>
                {Component}
            </group>
        );
    },
);

export { HorizontalScrollable };
