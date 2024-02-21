import { PaletteColor } from '@quarx-ui/core';

interface Values {
    name: string;
    color: Exclude<PaletteColor, 'danger'>;
}

export type { Values };
