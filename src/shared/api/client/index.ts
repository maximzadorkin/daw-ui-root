import axios from 'axios';
import { withUnauthorizedError } from '@shared/api/wrappers/withUnauthorizedError';
import { withAuth } from '@shared/api/wrappers/withAuth';
import { withErrorMessage } from '@shared/api/wrappers/withErrorMessage';

const httpClient = axios.create({
    // ToDo: add env config
    baseURL: 'http://localhost:3010',
    responseType: 'json' as const,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(undefined, withErrorMessage);
httpClient.interceptors.request.use(withAuth);
httpClient.interceptors.response.use(undefined, withUnauthorizedError);

export { httpClient };
