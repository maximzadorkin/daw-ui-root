import React, { FC, Fragment } from 'react';
import { IconButton, useBooleanState } from '@quarx-ui/core';
import { GearIcon } from '@quarx-ui/icons/gear/24px/stroke/rounded';
import { ChangeUserSettingsModal } from '../change-user-settings-modal/ChangeUserSettingsModal';

const ChangeUserButton: FC = () => {
    const [open, { setFalse: closeModal, setTrue: openModal }] =
        useBooleanState(false);

    return (
        <Fragment>
            <IconButton
                size="xSmall"
                type="text"
                color="secondary"
                onClick={openModal}
            >
                <GearIcon />
            </IconButton>
            <ChangeUserSettingsModal open={open} onClose={closeModal} />
        </Fragment>
    );
};

export { ChangeUserButton };
