import * as THREE from 'three';
import { hexToRgb } from '@quarx-ui/core';

const convertQuarxColorToThreeJs = (externalColor: string): THREE.Color => {
    let color = externalColor;
    if (color.startsWith('#')) {
        color = hexToRgb(color);
    }

    const noWords = color
        .replace('rgba', '')
        .replace('rgb(', '')
        .replace(')', '');

    const toNum = noWords
        .split(',')
        .map(parseFloat)
        .map((value) => value / 255);

    return new THREE.Color(...toNum);
};

export { convertQuarxColorToThreeJs };
