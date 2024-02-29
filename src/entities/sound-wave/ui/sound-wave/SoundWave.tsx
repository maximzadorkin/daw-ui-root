import { RecordingAudio } from '@shared/lib/audio-api';
import React, { FC, useRef } from 'react';
import { useTheme } from '@quarx-ui/core';
import { observer } from 'mobx-react';
import SecondaryToThreePoints from '@shared/lib/SecondaryToThreePoints';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { createSoundWaveShapeFromArray } from '../../model/createSoundWaveShapeFromArray';
import { SoundWaveProps } from './types';

const SoundWaveComponent: FC<SoundWaveProps> = ({
    audio,
    height,
    position = [0, 0, 0],
}) => {
    const { current: secondsConverter } = useRef(new SecondaryToThreePoints());
    const { palette } = useTheme();
    const duration =
        audio instanceof RecordingAudio
            ? audio?.audio?.duration ?? 0
            : audio.duration;

    const shapes = createSoundWaveShapeFromArray({
        fromX: position[0],
        fromY: position[1],
        height,
        step: secondsConverter.secondsToPoints(duration) / audio.peaks.length,
        array: Array.from(audio.peaks),
    });

    return (
        <mesh position={position}>
            <meshBasicMaterial
                color={convertQuarxColorToThreeJs(palette.background.main)}
            />
            <shapeGeometry args={[[shapes.default, shapes.inversed]]} />
        </mesh>
    );
};

export const SoundWave = observer(SoundWaveComponent);
