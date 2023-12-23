/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FC } from 'react';
import LightLampIcon from '@shared/icons/lamp_light.svg';
import DarkLampIcon from '@shared/icons/lamp_dark.svg';
import { useStyles } from './style';
import { LampProps } from './types';
import { useTheme } from '@quarx-ui/core';
import { THEME_TYPE } from '@shared/styles/types';

const lamps = {
    [THEME_TYPE.dark]: LightLampIcon,
    [THEME_TYPE.light]: DarkLampIcon,
};

const Lamp: FC<LampProps> = () => {
    const styles = useStyles();
    const theme = useTheme();
    const LampIcon = lamps[theme.palette.type];

    return (
        <div css={styles.lampWrapper}>
            <LampIcon css={styles.lamp} />
        </div>
    );
};

export { Lamp };
