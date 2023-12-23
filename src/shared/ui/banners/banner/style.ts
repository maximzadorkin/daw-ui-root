import { makeStyles, typography } from '@quarx-ui/core';

const useStyles = makeStyles(({ palette }) => ({
    card: {
        margin: 'auto',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 640,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        color: palette.text.main,
        ...typography.Headline.S.Regular,
    },
    description: {
        textAlign: 'center',
        color: palette.text.main,
        ...typography.Text.M.Medium,
    },
    stack: {
        marginTop: 12,
    },
    button: {
        width: 'fit-content',
    },
}));

export { useStyles };
