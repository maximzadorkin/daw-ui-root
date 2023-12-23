import { THEME_TYPE } from '@shared/styles/types';
import { AlertProps } from '@quarx-ui/core';

enum EVENT_TYPE {
    theme = 'theme',
    pushNotification = 'pushNotification',
    removeNotification = 'removeNotification',
    localStorageSet = 'localStorageSet',
    localStorageRemove = 'localStorageRemove',
}

interface EventsDetails {
    [EVENT_TYPE.theme]: THEME_TYPE;
    [EVENT_TYPE.pushNotification]: AlertProps & {
        autoRemove?: boolean;
        duration?: number;
    };
    [EVENT_TYPE.removeNotification]: string;
    [EVENT_TYPE.localStorageSet]: { key: string; value: string };
    [EVENT_TYPE.localStorageRemove]: string[];
}

export { EVENT_TYPE };
export type { EventsDetails };
