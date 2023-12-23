import { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { authStore } from '@shared/stores/auth';

const withAuth = (
    request: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => ({
    ...request,
    headers: <AxiosRequestHeaders>{
        ...request.headers,
        Authorization: `Bearer ${authStore.accessToken}`,
    },
});

export { withAuth };
