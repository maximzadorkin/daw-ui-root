import { LOCAL_STORAGE_KEYS } from './constants.register';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';

class LocalStorage {
    public set = <Type extends string = string>(
        key: LOCAL_STORAGE_KEYS,
        value: Type,
    ): void => {
        window.localStorage.setItem(key, value);
        eventBus.emit(EVENT_TYPE.localStorageSet, { key, value });
    };

    public get = <Type extends string = string>(
        key: LOCAL_STORAGE_KEYS,
    ): Type | null => {
        return window.localStorage.getItem(key) as Type;
    };

    public remove = (key: LOCAL_STORAGE_KEYS): void => {
        window.localStorage.removeItem(key);
        eventBus.emit(EVENT_TYPE.localStorageRemove, [key]);
    };

    public clear = (): void => {
        window.localStorage.clear();
        eventBus.emit(EVENT_TYPE.localStorageRemove, Object.keys(localStorage));
    };
}

const localStorage = new LocalStorage();

export { localStorage };
