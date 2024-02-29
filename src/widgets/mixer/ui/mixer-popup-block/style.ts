import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles<{ tracksCount: number }>(
    ({ palette }, { tracksCount }) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: 500,
            height: 500,
            width: '100%',
            borderTop: '1px solid',
            borderTopColor: palette.border.main,
        },
        header: {
            display: 'flex',
            padding: 4,
        },
        closeButton: {
            marginLeft: 'auto',
        },
        body: {
            height: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${tracksCount}, 200px)`,
            overflow: 'auto',
            borderTop: '1px solid',
            borderTopColor: palette.border.main,
        },
        track: {
            borderRight: '1px solid',
            borderRightColor: palette.border.main,
            height: '100%',
        },
    }),
    { name: 'MixerPopupBlock' },
);

export { useStyles };
