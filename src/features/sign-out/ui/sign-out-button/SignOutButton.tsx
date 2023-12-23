import React from 'react';
import { IconButton } from '@quarx-ui/core';
import { ArrowRightSquareIcon } from '@quarx-ui/icons/arrow-right-square/24px/stroke/rounded';
import { authStore } from '@shared/stores/auth';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';

const SignOutButton = () => {
    const onClickHandler = (): void => {
        try {
            void authStore.signOut();
            eventBus.emit(EVENT_TYPE.pushNotification, {
                title: 'Вы вышли из системы',
                color: 'success',
            });
        } finally {
        }
    };

    return (
        <IconButton
            size="xSmall"
            color="danger"
            type="text"
            onClick={onClickHandler}
        >
            <ArrowRightSquareIcon />
        </IconButton>
    );
};

export { SignOutButton };
