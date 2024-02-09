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
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            border: '1px solid',
            borderColor: palette.border.main,
            height: '100%',
        },
        fx: {
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
        },
        fxTitle: {
            ...typography.Text.M.Medium,
            color: palette.text.main,
        },
        actions: {
            display: 'flex',
            gap: 4,
        },
    }),
    { name: 'MixerTrack' },
);

export { useStyles };
