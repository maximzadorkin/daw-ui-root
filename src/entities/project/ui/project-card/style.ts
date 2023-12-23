import { borders, elevations, makeStyles, typography } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, borderRadii }) => ({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 16,
            ...elevations.main.medium,
            ...borders.create({
                size: 'small',
                color: palette.border.main,
            }),
            borderRadius: borderRadii.medium,
        },
        name: {
            marginLeft: 8,
            color: palette.text.main,
            ...typography.Text.L.Regular,
        },
        info: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
        },
        actions: {
            display: 'flex',
            marginLeft: 'auto',
            alignSelf: 'flex-start',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
        },
    }),
    { name: 'ProjectCard' },
);

export { useStyles };
