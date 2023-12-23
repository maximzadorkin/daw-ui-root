import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    {
        root: {
            position: 'fixed',
            top: 16,
            right: 0,
            paddingRight: 16,
            overflowY: 'auto',
            maxHeight: '100vh',
        },
    },
    { name: 'Notifications' },
);

export { useStyles };
