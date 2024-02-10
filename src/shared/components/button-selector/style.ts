import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles<{ width?: string | number }>(
    (_, { width }) => ({
        buttonRoot: {
            '&&': {
                width: '100%',
                justifyContent: 'flex-start',
            },
        },
        buttonTextWrapper: {
            '&&': {
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: width ?? '100%',
                textOverflow: 'ellipsis',
                textAlign: 'left',
            },
        },
    }),
    { name: 'ButtonSelector' },
);

export { useStyles };
