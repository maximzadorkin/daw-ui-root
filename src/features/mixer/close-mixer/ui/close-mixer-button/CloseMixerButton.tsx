/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { CrossIcon } from '@quarx-ui/icons/cross/16px/stroke/rounded/CrossIcon';
import { IconButton } from '@quarx-ui/core';
import { useProjectViewModel } from '@shared/stores';
import { CloseMixerButtonProps } from './types';

const CloseMixerButton: FC<CloseMixerButtonProps> = observer(
    ({ className }) => {
        const store = useProjectViewModel();

        const onClose = action((): void => {
            store.viewMixer = false;
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
