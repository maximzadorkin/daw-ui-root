import {
    borderRadii,
    borders,
    elevations,
    makeStyles,
    typography,
} from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        wrapper: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        root: {
            width: 420,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: palette.background.main,
            ...elevations.main.medium,
            borderRadius: borderRadii.create('all', 'medium'),
            ...borders.create({
                size: 'small',
                color: palette.border.main,
            }),
        },

        error: {
            ...typography.Text.M.Medium,
            color: palette.colors.danger.default,
        },

        label: {
            display: 'flex',
            margin: '0 auto 32px',
            color: palette.colors.warning.stronger['10'],
        },

        button: {
            marginTop: 12,
            width: '100%',
        },
    }),
    { name: 'SignUpForm' },
);

export { useStyles };
