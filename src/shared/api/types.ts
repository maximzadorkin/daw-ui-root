import { AxiosError } from 'axios';

interface ServerError {
    message: string;
    error: string;
    statusCode: number;
}

type AxiosServerError = AxiosError<ServerError>;

export type { ServerError, AxiosServerError };
