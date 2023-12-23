import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        root: {
            height: '100vh',
            minWidth: 740,
            background: palette.background.main,
        },
    }),
    { name: 'Container' },
);

export { useStyles };
