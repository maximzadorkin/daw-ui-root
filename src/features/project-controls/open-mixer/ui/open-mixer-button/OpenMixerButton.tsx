/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { IconButton } from '@quarx-ui/core';
import { ButtonType } from '@quarx-ui/core/src/main/Button/types';
import { EqualizerIcon } from '@quarx-ui/icons/equalizer/24px/stroke/rounded';
import { useProjectControls } from '@shared/contexts/project-controls-context';

const mapStateToType: Record<string, ButtonType> = {
    false: 'text',
    true: 'contained',
};

const OpenMixerButton: FC = observer(() => {
    const controls = useProjectControls();

    const onClick = action((): void => {
        controls.viewMixer = !controls.viewMixer;
    });

    return (
        <IconButton
            color="secondary"
            type={mapStateToType[String(controls.viewMixer)]}
            size="small"
            onClick={onClick}
        >
            <EqualizerIcon />
        </IconButton>
    );
});

export { OpenMixerButton };
