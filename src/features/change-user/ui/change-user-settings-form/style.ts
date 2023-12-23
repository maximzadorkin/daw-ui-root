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
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
        },
        textfield: {
            width: '100%',
        },
    }),
    { name: 'ChangeUserSettingsForm' },
);

export { useStyles };
