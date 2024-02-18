import React, { FC, useRef } from 'react';
import { isNil } from 'lodash';
import * as THREE from 'three';
import { action } from 'mobx';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useTheme } from '@quarx-ui/core';
import SecondaryToThreePoints from '@shared/audio/SecondaryToThreePoints';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { Background } from '@shared/components/three/background';
import { Divider } from '@shared/components/three/divider';
import { useProjectViewModel } from '@shared/stores';
import { createTriangleShape } from './triangle';
import { TimeSliderProps } from './types';

const TimeSlider: FC<TimeSliderProps> = ({
    size,
    position = [0, 0, 0],
    pointerSize = [12, 12],
    timelineWidth: externalTimelineWidth,
}) => {
    const selected = useRef<boolean>(false);
    const pointerRef = useRef<THREE.Mesh>(null);
    const lineRef = useRef<THREE.Mesh>(null);

    const { palette } = useTheme();
    const { current: secondsConverter } = useRef(new SecondaryToThreePoints());
    const project = useProjectViewModel();
    const mouseRef = useRef<number | null>(null);
    const projectWidth = secondsConverter.secondsToPoints(project.duration);
    const timelineWidth = externalTimelineWidth ?? projectWidth;

    const color = convertQuarxColorToThreeJs(palette.text.secondary);

    const onPointerDown = (event: ThreeEvent<MouseEvent>): void => {
        event.stopPropagation();
        selected.current = true;
        mouseRef.current = event.point.x;
    };

    const onPointerUp = (): void => {
        selected.current = false;
        mouseRef.current = null;
    };

    const onPointerMove = action((event: ThreeEvent<MouseEvent>): void => {
        if (isNil(selected.current) || isNil(mouseRef.current)) {
            return;
        }

        event.stopPropagation();
        const delta = event.point.x - (mouseRef.current ?? event.point.x);
        mouseRef.current = event.point.x;
        project.playTime += secondsConverter.pointsToSeconds(delta);
    });

    useFrame(() => {
        if (!pointerRef.current || !lineRef.current) {
            return;
        }

        pointerRef.current.position.x =
            -timelineWidth / 2 +
            secondsConverter.secondsToPoints(project.playTime);
        lineRef.current.position.x = secondsConverter.secondsToPoints(
            project.playTime,
        );
    });

    return (
        <group position={position}>
            <Background
                size={[timelineWidth, pointerSize[1]]}
                position={[
                    timelineWidth / 2,
                    -position[1] + pointerSize[1] / 2,
                    0,
                ]}
                meshProps={{
                    onPointerMove,
                    onPointerUp,
                }}
            >
                <mesh
                    ref={pointerRef}
                    position={[position[0] - timelineWidth / 2, 0, 1]}
                    onPointerDown={onPointerDown}
                >
                    <meshBasicMaterial color={color} />
                    {/* Почему отсчет от нижней точки? */}
                    <shapeGeometry
                        args={[
                            createTriangleShape({
                                position: [0, -pointerSize[1] / 2 - 2],
                                size: pointerSize,
                            }),
                        ]}
                    />
                </mesh>
            </Background>
            <Divider
                ref={lineRef}
                position={[0, 0, 0]}
                width={size[0]}
                height={size[1]}
                color={color}
            />
        </group>
    );
};

export { TimeSlider };
