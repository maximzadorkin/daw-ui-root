import { makeStyles } from '@quarx-ui/core';

const navSize = 280;

const useStyles = makeStyles<{ viewSidePage: boolean }>(
    (_, { viewSidePage }) => ({
        wrapper: viewSidePage && {
            display: 'grid',
            gridTemplateColumns: `${navSize}px 1fr`,
            gridTemplateAreas: 'nav page',
        },

        page: {
            position: 'relative',
            height: '100vh',
        },
    }),
    { name: 'App' },
);

export { useStyles };
