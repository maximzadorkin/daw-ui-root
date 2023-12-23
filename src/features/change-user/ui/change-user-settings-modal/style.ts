import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, typography, borderRadii }) => ({
        modal: {
            padding: 24,
            paddingBottom: '50vh',
            // width: 280,
            width: '100%',
            height: 'calc(100vh - 70px)',
            background: palette.background.main,
            borderTopRightRadius: borderRadii.small,
        },
        header: {
            display: 'flex',
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
            // flexDirection: 'column',
            gap: 6,
        },
        textfield: {
            width: '100%',
        },
    }),
    { name: 'ChangeUserSettingsModal' },
);

export { useStyles };
