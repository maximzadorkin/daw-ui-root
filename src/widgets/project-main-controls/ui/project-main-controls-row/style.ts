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
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 32px',
            gap: 16,
            ...elevations.secondary.small,
            backgroundColor: palette.background.main,
        },
        block: {},
        left: {
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 16,
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
        },
        right: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 16,
        },
    }),
    { name: 'ProjectMainControlsRow' },
);

export { useStyles };
