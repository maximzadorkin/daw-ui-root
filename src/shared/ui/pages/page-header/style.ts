import { borders, makeStyles, typography } from '@quarx-ui/core';

const useStyles = makeStyles(
    ({ palette }) => ({
        root: {
            height: 70,
            minHeight: 70,
            maxHeight: 70,
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...borders.create({
                size: 'small',
                side: 'bottom',
                color: palette.border.secondary,
            }),
        },

        title: {
            ...typography.Headline.S.Semibold,
            color: palette.text.main,
        },
    }),
    { name: 'PageHeader' },
);

export { useStyles };
