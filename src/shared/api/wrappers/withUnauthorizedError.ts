import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { ServerError } from '@shared/api/types';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { APIAuthUrls } from '@shared/api/modules/auth';
import { authStore } from '@shared/stores/auth';

const withUnauthorizedError = (error: AxiosError): void => {
    const isAuthModule =
        error?.config?.url &&
        Object.values<string>(APIAuthUrls).includes(error?.config?.url);

    if (!isAuthModule && isAxiosError<ServerError>(error)) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            eventBus.emit(EVENT_TYPE.pushNotification, {
                title: error.response?.data.error,
                description: error.response?.data.message,
                color: 'danger',
            });
            authStore.signOut().finally();
        }
    }

    throw error;
};

export { withUnauthorizedError };
