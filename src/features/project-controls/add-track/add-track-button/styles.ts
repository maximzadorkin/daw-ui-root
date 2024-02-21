import {
    makeStyles,
    PALETTE_COLORS,
    PaletteColor,
    StylesMap,
} from '@quarx-ui/core';

const COLOR_BOX = {
    borderRadius: 12,
    width: '100%',
    height: 40,
};

const useStyles = makeStyles(
    ({ palette, typography }) => ({
        root: {
            padding: 32,
            borderRadius: 12,
            background: palette.background.main,
            width: 420,
        },
        title: {
            color: palette.text.main,
            ...typography.base.headline.xSmall,
        },

        textField: {
            width: '100%',
        },
        colorTextField: {
            '&&': {
                height: 60,
            },
        },
        [PALETTE_COLORS.success]: {
            ...COLOR_BOX,
            background: palette.colors.success.default,
        },
        [PALETTE_COLORS.brand]: {
            ...COLOR_BOX,
            background: palette.colors.brand.default,
        },
        [PALETTE_COLORS.secondary]: {
            ...COLOR_BOX,
            background: palette.colors.secondary.default,
        },
        [PALETTE_COLORS.warning]: {
            ...COLOR_BOX,
            background: palette.colors.warning.default,
        },
        [PALETTE_COLORS.info]: {
            ...COLOR_BOX,
            background: palette.colors.info.default,
        },
    }),
    { name: 'AddTrackButton' },
);

export { useStyles };
