import { PaletteColor } from '@quarx-ui/core';
import { ButtonType } from '@quarx-ui/core/src/main/Button/types';

const mapStateToType: Record<string, ButtonType> = {
    false: 'text',
    true: 'contained',
};

const mapStateToColor: Record<string, PaletteColor> = {
    false: 'secondary',
    true: 'danger',
};

export { mapStateToColor, mapStateToType };
