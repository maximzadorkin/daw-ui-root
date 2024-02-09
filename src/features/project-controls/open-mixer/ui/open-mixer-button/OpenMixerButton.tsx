/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { IconButton } from '@quarx-ui/core';
import { EqualizerIcon } from '@quarx-ui/icons/equalizer/24px/stroke/rounded';
import { useProjectStore } from '@shared/stores';

const OpenMixerButton: FC = () => {
    const store = useProjectStore();
    const onClick = action((): void => {
        store.viewMixer = !store.viewMixer;
    });

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
