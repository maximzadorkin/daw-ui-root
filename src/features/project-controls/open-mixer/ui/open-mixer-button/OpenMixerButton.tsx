/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { IconButton } from '@quarx-ui/core';
import { ButtonType } from '@quarx-ui/core/src/main/Button/types';
import { EqualizerIcon } from '@quarx-ui/icons/equalizer/24px/stroke/rounded';
import { useProjectStore } from '@shared/stores';

const mapStateToType: Record<string, ButtonType> = {
    false: 'text',
    true: 'contained',
};

const OpenMixerButton: FC = observer(() => {
    const store = useProjectStore();
    const onClick = action((): void => {
        store.viewMixer = !store.viewMixer;
    });

    return (
        <IconButton
            color="secondary"
            type={mapStateToType[String(store.viewMixer)]}
            size="small"
            onClick={onClick}
        >
            <EqualizerIcon />
        </IconButton>
    );
});

export { OpenMixerButton };
