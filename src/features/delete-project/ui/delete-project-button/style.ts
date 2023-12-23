import { makeStyles } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette, typography, borderRadii }) => ({
        modal: {
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            minWidth: '50%',
            padding: 24,
            paddingBottom: '50vh',
            background: palette.background.main,
            borderRadius: borderRadii.medium,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        title: {
            ...typography.base.headline.small,
            color: palette.text.main,
        },
        subTitle: {
            ...typography.base.text.medium,
            color: palette.text.secondary,
            marginBottom: 16,
        },
        deleteButton: {
            maxWidth: 180,
            marginTop: 12,
            marginLeft: 'auto',
        },
    }),
    { name: 'DeleteProjectButton' },
);

export { useStyles };
