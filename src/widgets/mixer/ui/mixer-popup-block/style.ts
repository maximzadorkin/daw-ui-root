import {
    borderRadii,
    borders,
    elevations,
    makeStyles,
    typography,
} from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: 600,
            height: 600,
            width: '100%',
            borderTop: '1px solid',
            borderTopColor: palette.border.main,
        },
        header: {
            display: 'flex',
            padding: 12,
        },
        closeButton: {
            marginLeft: 'auto',
        },
        body: {
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(100, 200px)',
            overflow: 'auto',
        },
    }),
    { name: 'MixerPopupBlock' },
);

export { useStyles };
