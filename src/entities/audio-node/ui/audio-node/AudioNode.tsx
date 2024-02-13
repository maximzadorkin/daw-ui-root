import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { ThreeEvent } from '@react-three/fiber';
import { convertQuarxColorToThreeJs } from '@shared/styles/convert';
import { createRoundedRectangleShape } from '../../model/createRoundedRectangleShape';
import { useStateColor } from '../../model/useStateColor';
import { AudioNodeProps } from './types';

// 1s = 1 unit point
const AudioNodeComponent: FC<AudioNodeProps> = ({
    height = 48,
    track,
    audioNode,
    children,
}) => {
    const qxColor = useStateColor(track, audioNode);

    const onPointerDown = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        audioNode.selectNodeByUser();
    };

    const onPointerMove = (event: ThreeEvent<PointerEvent>): void => {
        audioNode.changeFromPoint(audioNode.from + event.movementX);
    };

    return (
        <group position={[audioNode.from, 0, 0.5]}>
            <mesh
                position={[audioNode.duration / 2, 0, 0]}
                onPointerDown={onPointerDown}
                onPointerUp={audioNode.unselectNodeByUser}
                onPointerLeave={audioNode.unselectNodeByUser}
                onPointerMove={onPointerMove}
            >
                <meshBasicMaterial
                    color={convertQuarxColorToThreeJs(qxColor.toString())}
                />
                <shapeGeometry
                    args={[
                        createRoundedRectangleShape(
                            audioNode.duration,
                            height,
                            6,
                        ),
                    ]}
                />
            </mesh>
            {children}
        </group>
    );
};

export const AudioNode = observer(AudioNodeComponent);
