interface TimeSliderProps {
    /** [x, y, z]
     * @default [0, 0, 0] */
    position?: [number, number, number];

    /** [width, height] */
    size: [number, number];

    /** @default project.duration */
    timelineWidth?: number;

    /** [width, height]
     * @defautl [12, 12] */
    pointerSize?: [number, number];
}

export type { TimeSliderProps };
