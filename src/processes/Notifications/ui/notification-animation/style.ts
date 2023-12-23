import { makeStyles } from '@quarx-ui/core';

interface StyleParams {
    slideIn: boolean;
    height: number;
    hidden: boolean;
}

const useStyles = makeStyles(
    (_, { slideIn, height, hidden }: StyleParams) => ({
        collapse: {
            height: `${height}px`,
            transition: 'height 500ms',
        },
        element: [
            {
                transform: 'translateX(200%)',
                transition: 'transform 500ms',
            },
            slideIn && {
                transform: 'translateX(0)',
            },
            hidden && {
                visibility: 'hidden',
            },
        ],
    }),
    { name: 'NotificationAnimation' },
);

export { useStyles };
