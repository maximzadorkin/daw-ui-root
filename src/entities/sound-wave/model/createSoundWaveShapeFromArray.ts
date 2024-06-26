import * as THREE from 'three';

interface SoundWaveCreatorReturned {
    default: THREE.Shape;
    inversed: THREE.Shape;
}

interface SoundWaveCreatorProps {
    fromX: number;
    fromY: number;
    array: number[];
    step: number;
    height: number;
}

const createSoundWaveShapeFromArray = ({
    fromX,
    fromY,
    array,
    step,
    height,
}: SoundWaveCreatorProps): SoundWaveCreatorReturned => {
    const shape = new THREE.Shape();
    shape.moveTo(fromX, fromY);

    const inverseShape = new THREE.Shape();
    inverseShape.moveTo(fromX, fromY);

    const point = { x: fromX, y: fromY };
    for (let index = 0; index < array.length; index += 1) {
        point.x += step;
        point.y = array[index] * (height / 2);

        shape.lineTo(point.x, point.y);
        inverseShape.lineTo(point.x, -point.y);
    }

    shape.lineTo(point.x, fromY);
    inverseShape.lineTo(point.x, fromY);

    return {
        default: shape,
        inversed: inverseShape,
    };
};

export { createSoundWaveShapeFromArray };
