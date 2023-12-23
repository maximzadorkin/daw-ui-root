import { borders, makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        root: {
            padding: 16,
            display: 'flex',
            alignItems: 'center',
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
    { name: 'PageFooter' },
);

export { useStyles };
