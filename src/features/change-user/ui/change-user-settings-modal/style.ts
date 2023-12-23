import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, borderRadii }) => ({
        modal: {
            padding: 24,
            paddingBottom: '50vh',
            width: '100%',
            height: 'calc(100vh - 70px)',
            background: palette.background.main,
            borderTopRightRadius: borderRadii.small,
        },
        divider: {
            margin: '16px 0',
        },
    }),
    {
        name: 'ChangeUserSettingsModal',
    },
);

export { useStyles };
