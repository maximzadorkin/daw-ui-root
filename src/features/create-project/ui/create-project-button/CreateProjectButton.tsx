import React, { FC, Fragment } from 'react';
import { Button, useBooleanState } from '@quarx-ui/core';
import { PlusIcon } from '@quarx-ui/icons/plus/16px/stroke/rounded';
import { CreateProjectModal } from '../create-project-modal';

const CreateProjectButton: FC = () => {
    const [open, { setTrue: openModal, setFalse: closeModal }] =
        useBooleanState(false);

    return (
        <Fragment>
            <Button
                size="small"
                color="info"
                leftIcon={<PlusIcon />}
                onClick={openModal}
            >
                Создать проект
            </Button>
            <CreateProjectModal open={open} onClose={closeModal} />
        </Fragment>
    );
};

export { CreateProjectButton };
