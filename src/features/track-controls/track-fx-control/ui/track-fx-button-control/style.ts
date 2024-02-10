import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    () => ({
        root: {
            display: 'flex',
        },
        main: {
            width: '100%',
            height: 'auto',
            justifyContent: 'flex-start',
            borderRight: 'none',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
        remove: {
            height: 'auto',
            borderLeft: 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
    }),
    { name: 'TrackFxButtonControl' },
);

export { useStyles };
