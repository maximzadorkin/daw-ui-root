import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    {
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative',
        },
    },
    { name: 'Page' },
);

export { useStyles };
