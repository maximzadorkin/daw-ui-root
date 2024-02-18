import { Object3DNode, MaterialNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline';

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<
            MeshLineGeometry,
            typeof MeshLineGeometry
        >;
        meshLineMaterial: MaterialNode<
            MeshLineMaterial,
            typeof MeshLineMaterial
        >;
    }
}

declare module '*.sass';
declare module '*.css';
declare module '*.svg';
