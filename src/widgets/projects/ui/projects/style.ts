import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, breakpoints }) => ({
        root: {
            padding: 8,
            display: 'grid',
            gap: 8,
            [breakpoints.between(0, 940)]: {
                gridTemplateColumns: '1fr',
            },
            [breakpoints.between(940, 1240)]: {
                gridTemplateColumns: '1fr 1fr',
            },
            [breakpoints.up(1240)]: {
                gridTemplateColumns: '1fr 1fr 1fr',
            },
        },
        loader: {
            color: palette.text.main,
        },
        reload: {
            marginLeft: 'auto',
        },
    }),
    { name: 'Projects' },
);

export { useStyles };
