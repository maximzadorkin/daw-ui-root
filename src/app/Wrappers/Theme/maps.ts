import { PaletteType } from '@quarx-ui/core';
import { THEME_TYPE } from '@shared/styles/types';

const mapPaletteTypeToThemeType: Record<PaletteType, THEME_TYPE> = {
    light: THEME_TYPE.light,
    dark: THEME_TYPE.dark,
};

export { mapPaletteTypeToThemeType };
