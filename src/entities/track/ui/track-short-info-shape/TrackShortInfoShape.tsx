import React, { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTheme } from '@quarx-ui/core';
import { Divider } from '@shared/components/three/divider';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { Track } from '@shared/lib/audio-api';
import { prepareTitleFontSize } from '../../model/prepareTitleFontSIze';
import { renderThreeText } from '../../model/renderThreeText';
import { PADDING_X } from './constants';

const TrackShortInfoShape: FC<{
    position: [number, number, number];
    height: number;
    width: number;
    track: Track;
}> = ({ track, height, width, position }) => {
    const { palette } = useTheme();
    const [text, setText] = useState<string | null>(null);
    const textRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        setText(track ? track.name : '...');
    }, [track]);

    const onUpdate = (ref: THREE.Mesh): void => {
        const defaultBox = { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } };
        const { min, max } = ref.geometry.boundingBox ?? defaultBox;
        const actualWidth = Math.abs(max.x - min.x) + PADDING_X * 2;
        if (actualWidth > width) {
            const actualText = ref.userData.text;
            setText(actualText.slice(0, -1));
        }
    };

    return (
        <group position={position}>
            <mesh position={[width / 2, 0, -1]}>
                <boxGeometry args={[width, height]} />
                <meshBasicMaterial
                    color={convertQuarxColorToThreeJs(palette.background.main)}
                />
            </mesh>
            <Divider
                position={[width / 2, height / 2, 0]}
                height={1}
                width={width}
            />
            <Text
                ref={textRef}
                onSync={onUpdate}
                maxWidth={width}
                whiteSpace="nowrap"
                color={palette.text.main}
                anchorX={-PADDING_X}
                anchorY="middle"
                lineHeight={1}
                letterSpacing={0.1}
                font="/Roboto-Regular.ttf"
                userData={{ text }}
                fontSize={prepareTitleFontSize(height)}
            >
                {renderThreeText(track, text)}
            </Text>
            <Divider
                position={[width / 2, -height / 2, 0]}
                height={1}
                width={width}
            />
        </group>
    );
};

export { TrackShortInfoShape };
