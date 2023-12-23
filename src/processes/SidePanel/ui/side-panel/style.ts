import { borders, makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        root: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            ...borders.create({
                size: 'small',
                side: 'right',
                color: palette.border.secondary,
            }),
        },

        label: {
            display: 'flex',
            color: palette.colors.warning.stronger['10'],
        },

        pages: {
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
        },

        link: {
            outline: 'none',
            textDecoration: 'none',
        },

        header: {
            padding: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 70,
            minHeight: 70,
            maxHeight: 70,
            ...borders.create({
                size: 'small',
                side: 'bottom',
                color: palette.border.secondary,
            }),
        },

        personal: {
            padding: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...borders.create({
                size: 'small',
                side: 'bottom',
                color: palette.border.secondary,
            }),
        },

        body: {
            height: '100%',
            overflowY: 'auto',
        },

        footer: {
            padding: 16,
            height: 70,
            minHeight: 70,
            maxHeight: 70,
            overflow: 'hidden',
            ...borders.create({
                size: 'small',
                side: 'top',
                color: palette.border.secondary,
            }),
        },
    }),
    { name: 'SidePanel' },
);

export { useStyles };
