import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';
import { PaletteColor, useTheme } from '@quarx-ui/core';
import { convertQuarxColorToThreeJs } from '../../../styles/convert';

interface UseColorsProps {
    color: PaletteColor;
    hover: boolean;
    active: boolean;
}

interface UseColorsReturns {
    text: ReactThreeFiber.Color;
    background: ReactThreeFiber.Color;
}

const cv = convertQuarxColorToThreeJs;

const useColors = ({
    color: externalColor,
    hover,
    active,
}: UseColorsProps): UseColorsReturns => {
    const { palette } = useTheme();

    const colors = {
        text: cv(palette.text.main),
        background: cv(palette.colors[externalColor].default),
    };

    if (hover) {
        colors.background = cv(palette.colors[externalColor].hover);
    }

    if (active) {
        colors.background = cv(palette.colors[externalColor].press);
    }

    return colors;
};

export { useColors };
