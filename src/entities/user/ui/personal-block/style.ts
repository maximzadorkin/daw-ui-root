import { makeStyles, typography } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: palette.text.main,
        },
        info: {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        },
        username: {
            ...typography.Text.M.Regular,
            color: palette.text.secondary,
        },
        greeting: {
            ...typography.Text.L.Medium,
            color: palette.text.main,
        },
        actions: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
        },
    }),
    { name: 'PersonalBlock' },
);

export { useStyles };
