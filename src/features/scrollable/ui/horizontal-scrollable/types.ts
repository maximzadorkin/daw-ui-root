import { ReactNode } from 'react';

interface HorizontalScrollableProps {
    pages: number;

    /** размер одной страницы
     * @default scene size */
    size?: number;

    children: ReactNode | ReactNode[];
}

export type { HorizontalScrollableProps };
