import { httpClient } from '@shared/api/client';
import { User } from './types';

enum APIUsersUrls {
    getMe = '/users/me',
}

const usersClient = {
    getMe: async (): Promise<User> => {
        const result = await httpClient.get<User>(APIUsersUrls.getMe);
        return result.data;
    },
};

export { usersClient, APIUsersUrls };
