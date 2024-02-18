import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ typography, palette }) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        title: {
            ...typography.base.headline.xSmall,
            color: palette.text.main,
        },
        block: {
            padding: 12,
        },
        horizontal: {
            display: 'flex',
            gap: 8,
        },
        vertical: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
        },
        indicators: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        fxHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        fxTitle: {
            ...typography.base.text.large,
            color: palette.text.main,
        },
    }),
    { name: 'MixerTrack' },
);

export { useStyles };
