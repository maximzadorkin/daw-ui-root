import { makeStyles, typography } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, borderRadii }) => ({
        form: {
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 32,
            minWidth: 420,
            width: 420,
            borderTopLeftRadius: borderRadii.medium,
            borderBottomLeftRadius: borderRadii.medium,
            background: palette.background.main,
        },
        title: {
            ...typography.Headline.S.Regular,
            color: palette.text.main,
        },
        field: {
            width: '100%',
        },
        button: {
            marginLeft: 'auto',
        },
    }),
    { name: 'CreateProjectModal' },
);

export { useStyles };
