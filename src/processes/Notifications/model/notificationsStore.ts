import { action, makeAutoObservable, observable } from 'mobx';
import { AlertProps } from '@quarx-ui/core';
import { v4 } from 'uuid';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';

type NotificationId = string;

interface Notification {
    id: NotificationId;
    open: boolean;
    props: Partial<AlertProps & { autoRemove?: boolean; duration?: number }>;
}

class NotificationsStore {
    private DURATION = 5000;
    private SLIDE_OUT_ANIMATION_DURATION = 1000;

    @observable
    public notifications: Notification[] = [];

    constructor(duration: number = 5000) {
        this.DURATION = duration;
        makeAutoObservable(this);

        eventBus.on(EVENT_TYPE.pushNotification, this.onPushEvent);
        eventBus.on(EVENT_TYPE.removeNotification, this.onRemoveEvent);
    }

    @action
    public push = ({
        autoRemove = true,
        duration = this.DURATION,
        ...notification
    }: Notification['props']): NotificationId => {
        const notificationId = v4();
        this.notifications.push({
            id: notificationId,
            open: true,
            props: { ...notification, autoRemove, duration },
        });

        const { remove } = this;
        if (autoRemove) {
            setTimeout(() => {
                remove(notificationId);
            }, duration);
        }

        return notificationId;
    };

    @action
    public remove = (notificationId: NotificationId): void => {
        this.setNotificationVisible(notificationId, false);
        setTimeout(() => {
            this.notifications = this.notifications.filter(
                (notification) => notification.id !== notificationId,
            );
        }, this.SLIDE_OUT_ANIMATION_DURATION);
    };

    @action
    private onPushEvent = (event: CustomEvent<AlertProps>): void => {
        this.push(event.detail);
    };

    @action
    private onRemoveEvent = (event: CustomEvent<NotificationId>): void => {
        this.remove(event.detail);
    };

    @action
    private setNotificationVisible = (
        id: NotificationId,
        visible: boolean,
    ): void => {
        this.notifications = this.notifications.map((notification) => {
            if (notification.id === id) {
                return { ...notification, open: visible };
            }
            return notification;
        });
    };
}

const notificationsStore = new NotificationsStore();

export { notificationsStore };
