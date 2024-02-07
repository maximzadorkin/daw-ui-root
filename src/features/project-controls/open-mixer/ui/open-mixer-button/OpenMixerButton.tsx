/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { IconButton } from '@quarx-ui/core';
import { EqualizerIcon } from '@quarx-ui/icons/equalizer/24px/stroke/rounded';

// ToDo: Добавить открытие модального окна с микшером
const OpenMixerButton: FC = () => {
    const onClick = (): void => {
        // openMixer
    };

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            onClick={onClick}
        >
            <EqualizerIcon />
        </IconButton>
    );
};

export { OpenMixerButton };
