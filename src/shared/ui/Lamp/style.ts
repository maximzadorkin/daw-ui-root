import { makeStyles } from '@quarx-ui/core';
import { keyframes } from '@emotion/react';

const useStyles = makeStyles(({ palette }) => {
    const animation = keyframes`
        0% {
          color: ${palette.colors.success.default};
        }
        33% {
          color: ${palette.colors.info.default};
        }
        66% {
          color: ${palette.colors.warning.default};
        }
        100% {
          color: ${palette.colors.success.default};
        }
    `;

    return {
        lampWrapper: {
            margin: '0 auto',
            width: 'fit-content',
        },

        lamp: {
            color: palette.colors.warning.default,
            animation: `${animation} 5s ease infinite`,
        },
    };
});

export { useStyles };
