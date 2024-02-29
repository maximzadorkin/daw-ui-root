import { useTheme } from '@quarx-ui/core';
import { Text } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { Loader } from '@shared/components/three/loader';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';
import {
    ProjectTimelineControls,
    useProjectControls,
} from '@shared/contexts/project-controls-context';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { action, observe } from 'mobx';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef } from 'react';
import { createRoundedRectangleShape } from '../../model/createRoundedRectangleShape';
import { useStateColor } from '../../model/useStateColor';
import { AudioProps } from './types';

const BORDER_WIDTH = 2;
const BORDER_RADIUS = 4;

// 1s = 1 unit point
export const Audio: FC<AudioProps> = observer(
    ({ height: externalHeight = 48, track, audio, children }) => {
        const { current: secondsConverter } = useRef(
            new SecondaryToThreePoints(),
        );
        const controls = useProjectControls();
        const isMoveControl =
            controls.timelineControl === ProjectTimelineControls.move;
        const isRemoveControl =
            controls.timelineControl === ProjectTimelineControls.remove;

        const duration = audio.initialized
            ? secondsConverter.secondsToPoints(audio.duration)
            : 100;
        const delay = secondsConverter.secondsToPoints(audio.offset);
        const pointer = useRef<number | null>();
        const qxColor = useStateColor(controls, track, audio);
        const height = externalHeight - 2;
        const innerMeshHeight = height - BORDER_WIDTH * 2;
        const innerMeshWidth = duration - BORDER_WIDTH * 2;
        const outMeshHeight = height;
        const outMeshWidth = duration;

        const onPointerDown = action(
            (event: ThreeEvent<PointerEvent>): void => {
                event.stopPropagation();

                if (!isMoveControl) {
                    return;
                }

                controls.addAudioToSelected(audio);
                if (pointer.current) {
                    pointer.current = event.point.x;
                }
            },
        );

        const onPointerMove = action(
            (event: ThreeEvent<PointerEvent>): void => {
                if (
                    !isMoveControl ||
                    !controls.isSelectedAudio(audio.id) ||
                    audio.isPlaying
                ) {
                    return;
                }

                event.stopPropagation();
                if (pointer.current) {
                    const delta = event.point.x - pointer.current;
                    audio.offset =
                        audio.offset + secondsConverter.pointsToSeconds(delta);
                }

                pointer.current = event.point.x;
            },
        );

        const onPointerLeave = (): void => {
            controls.removeAudioFromSelected(audio.id);
            pointer.current = null;
        };

        const onClickHandler = action((): void => {
            if (isRemoveControl) {
                track.removeAudio(audio.id);
            }
        });

        useEffect(() => {
            observe(controls, 'timelineControl', (change) => {
                if (change.newValue === ProjectTimelineControls.remove) {
                    controls.removeAudioFromSelected(audio.id);
                }
            });

            window.addEventListener('pointerup', onPointerLeave);

            return () => {
                window.removeEventListener('pointerup', onPointerLeave);
            };
        }, []);

        return (
            <group position={[delay, 0, 0.5]}>
                <mesh position={[duration / 2, 0, 0]}>
                    <meshBasicMaterial
                        color={convertQuarxColorToThreeJs(qxColor.border)}
                    />
                    <shapeGeometry
                        args={[
                            createRoundedRectangleShape(
                                outMeshWidth,
                                outMeshHeight,
                                BORDER_RADIUS,
                            ),
                        ]}
                    />
                </mesh>
                <mesh
                    position={[duration / 2, 0, 0]}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    // onPointerUp={onPointerLeave}
                    // onPointerLeave={onPointerLeave}
                    // onPointerOut={onPointerLeave}
                    onClick={onClickHandler}
                >
                    <meshBasicMaterial
                        color={convertQuarxColorToThreeJs(qxColor.background)}
                    />
                    <shapeGeometry
                        args={[
                            createRoundedRectangleShape(
                                innerMeshWidth,
                                innerMeshHeight,
                                BORDER_RADIUS,
                            ),
                        ]}
                    />
                </mesh>
                {!audio.initialized && (
                    <Loader position={[duration / 2, 0, 0]} size={height / 2} />
                )}
                {!audio.available && audio.initialized && (
                    <Text
                        position={[duration / 2, 0, 0]}
                        textAlign="center"
                        fontSize={innerMeshHeight / 4}
                        maxWidth={innerMeshWidth * 0.8}
                        font="/Roboto-Regular.ttf"
                    >
                        Ошибка загрузки
                    </Text>
                )}
                {audio.initialized && children}
            </group>
        );
    },
);
