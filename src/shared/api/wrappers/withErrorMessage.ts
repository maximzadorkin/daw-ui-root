import { AxiosError } from 'axios';
import { ServerError } from '@shared/api/types';
import { cloneDeep, isArray, isNil } from 'lodash';

const withErrorMessage = (error: AxiosError<ServerError>): void => {
    const newError = cloneDeep(error);
    if (!isNil(newError.response?.data)) {
        if (isArray(newError.response.data.message)) {
            const [message] = newError.response.data.message;
            newError.response.data.message = message;
        }
    }

    throw newError;
};

export { withErrorMessage };
