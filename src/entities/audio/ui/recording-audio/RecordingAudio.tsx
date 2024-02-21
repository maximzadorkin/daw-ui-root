import { useFrame } from '@react-three/fiber';
import React, { FC, useRef } from 'react';
import { observer } from 'mobx-react';
import { useTheme } from '@quarx-ui/core';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { createRoundedRectangleShape } from '../../model/createRoundedRectangleShape';
import { RecordingAudioProps } from './types';

const BORDER_WIDTH = 2;
const BORDER_RADIUS = 4;

// 1s = 1 unit point
const RecordingAudioComponent: FC<RecordingAudioProps> = ({
    height: externalHeight = 48,
    audio,
    children,
}) => {
    const { current: secondsConverter } = useRef(new SecondaryToThreePoints());
    const {
        palette: { colors },
    } = useTheme();

    const duration = secondsConverter.secondsToPoints(
        audio.audio?.duration ?? 0,
    );
    const delay = secondsConverter.secondsToPoints(audio.offset);
    const height = externalHeight - 2;
    const innerMeshHeight = height - BORDER_WIDTH * 2;
    const innerMeshWidth = duration - BORDER_WIDTH * 2;
    const outMeshHeight = height;
    const outMeshWidth = duration;

    return (
        <group position={[delay, 0, 0.5]}>
            <mesh position={[duration / 2, 0, 0]}>
                <meshBasicMaterial
                    color={convertQuarxColorToThreeJs(colors.danger.weaker.max)}
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
            <mesh position={[duration / 2, 0, 0]}>
                <meshBasicMaterial
                    color={convertQuarxColorToThreeJs(colors.danger.default)}
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
            {children}
        </group>
    );
};

export const RecordingAudio = observer(RecordingAudioComponent);
