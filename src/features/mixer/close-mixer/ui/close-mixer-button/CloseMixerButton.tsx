/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { CrossIcon } from '@quarx-ui/icons/cross/16px/stroke/rounded/CrossIcon';
import { IconButton } from '@quarx-ui/core';
import { useProjectControls } from '@shared/stores';
import { CloseMixerButtonProps } from './types';

const CloseMixerButton: FC<CloseMixerButtonProps> = observer(
    ({ className }) => {
        const controls = useProjectControls();

        const onClose = action((): void => {
            controls.viewMixer = false;
        });

        return (
            <IconButton
                type="text"
                size="xSmall"
                color="secondary"
                onClick={onClose}
                className={className}
            >
                <CrossIcon />
            </IconButton>
        );
    },
);

export { CloseMixerButton };
