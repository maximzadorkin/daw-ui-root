import { makeStyles, typography } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        slider: {
            height: 26,
            width: '100%',
            borderRadius: 6,
            border: '1px solid',
            borderColor: palette.colors.secondary.border,
            overflow: 'hidden',
            cursor: 'pointer',
        },
        track: {
            background: 'transparent',
            height: '100%',
            borderRadius: 16,
        },
        thumb: {
            boxSizing: 'border-box',
            height: 24,
            width: 24,
            border: 'none',
            borderRadius: 6,
            outline: 'none',
            zIndex: 'auto !important',
            backgroundColor: palette.colors.secondary.default,
        },
        thumbValue: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: palette.text.main,
            ...typography.Text.S.Medium,
            fontSize: 10,
        },
    }),
    { name: 'PanTrackSlider' },
);

export { useStyles };
