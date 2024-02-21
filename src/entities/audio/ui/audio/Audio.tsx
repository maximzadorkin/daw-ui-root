import { useProjectControls } from '@shared/stores';
import React, { FC, useRef } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { ThreeEvent } from '@react-three/fiber';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { Loader } from '@shared/components/three/loader';
import { createRoundedRectangleShape } from '../../model/createRoundedRectangleShape';
import { useStateColor } from '../../model/useStateColor';
import { AudioProps } from './types';

const BORDER_WIDTH = 2;
const BORDER_RADIUS = 4;

// 1s = 1 unit point
const AudioComponent: FC<AudioProps> = ({
    height: externalHeight = 48,
    track,
    audio,
    children,
}) => {
    const { current: secondsConverter } = useRef(new SecondaryToThreePoints());
    const controls = useProjectControls();

    const duration = audio.initialized
        ? secondsConverter.secondsToPoints(audio.duration)
        : 100;
    const delay = secondsConverter.secondsToPoints(audio.offset);
    const pointer = useRef<number | null>();
    const qxColor = useStateColor(track, audio);
    const height = externalHeight - 2;
    const innerMeshHeight = height - BORDER_WIDTH * 2;
    const innerMeshWidth = duration - BORDER_WIDTH * 2;
    const outMeshHeight = height;
    const outMeshWidth = duration;

    const onPointerDown = action((event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        controls.selectedAudios.push(audio);
        if (pointer.current) {
            pointer.current = event.point.x;
        }
    });

    const onPointerMove = action((event: ThreeEvent<PointerEvent>): void => {
        if (!controls.isSelectedAudio(audio.id) || audio.isPlaying) {
            return;
        }

        event.stopPropagation();
        if (pointer.current) {
            const delta = event.point.x - pointer.current;
            audio.offset =
                audio.offset + secondsConverter.pointsToSeconds(delta);
        }

        pointer.current = event.point.x;
    });

    const onPointerLeave = action((event: ThreeEvent<PointerEvent>): void => {
        if (!controls.isSelectedAudio(audio.id)) {
            return;
        }

        controls.removeAudioFromSelected(audio.id);
        pointer.current = null;
        event.stopPropagation();
    });

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
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerLeave}
                onPointerLeave={onPointerLeave}
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
            {audio.initialized && children}
        </group>
    );
};

export const Audio = observer(AudioComponent);
