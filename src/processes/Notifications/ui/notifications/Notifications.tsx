import React, { FC, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';
import { Alert, Stack } from '@quarx-ui/core';
import { notificationsStore } from '../../model/notificationsStore';
import { NotificationAnimation } from '../notification-animation';
import { useStyles } from './style';
import { NotificationsProps } from './types';

const Notifications: FC<NotificationsProps> = observer(({ children }) => {
    const styles = useStyles();

    const createOnCloseHandler = (id: string) => (): void => {
        notificationsStore.remove(id);
    };

    return (
        <Fragment>
            {children}
            {createPortal(
                <Stack css={styles.root} direction="column">
                    {[...notificationsStore.notifications]
                        .reverse()
                        .map((notification) => (
                            <NotificationAnimation
                                key={notification.id}
                                open={notification.open}
                            >
                                <Alert
                                    size="small"
                                    color="default"
                                    elevation="xLarge"
                                    onClose={createOnCloseHandler(
                                        notification.id,
                                    )}
                                    {...notification.props}
                                />
                            </NotificationAnimation>
                        ))}
                </Stack>,
                document.body,
            )}
        </Fragment>
    );
});

export { Notifications };
