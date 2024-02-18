import { ReactNode } from 'react';
import { AudioViewModel, TrackViewModel } from '@shared/stores';

interface AudioProps {
    /** @default 48 */
    height?: number;

    audio: AudioViewModel;

    track: TrackViewModel;

    children?: ReactNode | ReactNode[];
}

export type { AudioProps };
