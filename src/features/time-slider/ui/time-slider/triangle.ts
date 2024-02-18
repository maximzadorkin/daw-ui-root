import * as THREE from 'three';

interface CreateTriangleShapeProps {
    position: [number, number];

    size: [number, number];
}

export const createTriangleShape = ({
    size,
    position: externalPosition,
}: CreateTriangleShapeProps): THREE.Shape => {
    const [width, height] = [size[0] / 2, size[1]];
    const position = new THREE.Vector2(...externalPosition);
    const shape = new THREE.Shape();

    const x = position.x;
    const y = position.y;

    shape.moveTo(x, y);
    shape.lineTo(x + width, y + height);
    shape.lineTo(x - width, y + height);

    return shape;
};
