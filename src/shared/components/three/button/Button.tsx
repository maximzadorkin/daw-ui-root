import { Vector3 } from '@react-three/fiber/dist/declarations/src/three-types';
import React, { FC, useState } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { PALETTE_COLORS } from '@quarx-ui/core';
import { createRoundedRectangleShape } from './createRoundedRectangleShape';
import { useColors } from './useColors';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
    size = new THREE.Vector2(24, 24),
    radius = 4,
    color = PALETTE_COLORS.secondary,
    children,
    TextProps,
    ...props
}) => {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const colors = useColors({ color, hover, active });
    const textPos = (TextProps?.position ??
        new THREE.Vector3(0, 0, 0)) as THREE.Vector3;

    const onPointerEnterHandler = (event: ThreeEvent<PointerEvent>): void => {
        setHover(true);
        props.onPointerEnter?.(event);
    };

    const onPointerLeaveHandler = (event: ThreeEvent<PointerEvent>): void => {
        setHover(false);
        props.onPointerLeave?.(event);
    };

    const onPointerDownHandler = (event: ThreeEvent<PointerEvent>): void => {
        setActive(true);
        props.onPointerDown?.(event);
    };
    const onPointerUpHandler = (event: ThreeEvent<PointerEvent>): void => {
        setActive(false);
        props.onPointerUp?.(event);
    };

    return (
        <mesh
            {...props}
            onPointerEnter={onPointerEnterHandler}
            onPointerLeave={onPointerLeaveHandler}
            onPointerDown={onPointerDownHandler}
            onPointerUp={onPointerUpHandler}
        >
            <shapeGeometry
                args={[
                    createRoundedRectangleShape(
                        size.width,
                        size.height,
                        radius,
                    ),
                ]}
            />
            <meshBasicMaterial color={colors.background} />
            <Text
                textAlign="center"
                maxWidth={size.width}
                color={colors.text}
                lineHeight={1}
                letterSpacing={0.1}
                font="/Roboto-Regular.ttf"
                anchorY="middle"
                fontSize={12}
                {...TextProps}
                position={[textPos?.x, textPos.y - 1, textPos.z]}
            >
                {children}
            </Text>
        </mesh>
    );
};

export { Button };
