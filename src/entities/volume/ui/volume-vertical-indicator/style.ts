import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        slider: {
            width: 32,
            height: 240,
            borderRadius: 6,
            border: '1px solid',
            borderColor: palette.colors.secondary.border,
            overflow: 'hidden',
            cursor: 'pointer',
        },
        track: {
            background: 'transparent',
            width: '100%',
            borderRadius: 6,
            '&:first-child': {
                backgroundColor: palette.colors.secondary.weaker['80'],
            },
        },
        thumb: {
            display: 'none',
        },
    }),
    { name: 'PanTrackSlider' },
);

export { useStyles };
