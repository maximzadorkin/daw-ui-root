import {
    borderRadii,
    borders,
    elevations,
    makeStyles,
    typography,
} from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        slider: {
            maxWidth: 220,
            width: 220,
            height: 26,
            borderRadius: 16,
            border: '1px solid',
            borderColor: palette.colors.secondary.border,
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover, &:active': {
                '& > div:last-child': {
                    color: palette.text.main,
                },
            },
        },
        track: {
            background: 'transparent',
            height: '100%',
            borderRadius: 16,
            '&:first-child': {
                backgroundColor: palette.colors.brand.default,
            },
        },
        thumb: {
            boxSizing: 'border-box',
            height: 24,
            width: 32,
            borderRadius: '100%',
            outline: 'none',
            border: 'none',
            backgroundColor: palette.colors.brand.default,
        },
        thumbValue: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'transparent',
            ...typography.Text.S.Medium,
            fontSize: 12,
        },
    }),
    { name: 'ProjectVolumeRange' },
);

export { useStyles };
