import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, typography }) => ({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
        },
        title: {
            ...typography.base.headline.xSmall,
            color: palette.text.main,
        },
        fields: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
        },
        field: {
            width: '100%',
        },
        button: {
            marginTop: 12,
            marginLeft: 'auto',
        },
        error: {
            marginTop: 6,
            color: palette.colors.danger.default,
            ...typography.base.text.medium,
        },
    }),
    { name: 'ChangeUserPasswordForm' },
);

export { useStyles };
