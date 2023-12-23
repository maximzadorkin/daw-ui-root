import { httpClient } from '@shared/api/client';
import { ChangeUserSettingsDto, User } from './types';

enum APIUsersUrls {
    getMe = '/users/me',
    changeSettings = '/users/me',
}

const usersClient = {
    getMe: async (): Promise<User> => {
        const result = await httpClient.get<User>(APIUsersUrls.getMe);
        return result.data;
    },

    changeSettings: async (settings: ChangeUserSettingsDto): Promise<User> => {
        const result = await httpClient.put<User>(
            APIUsersUrls.changeSettings,
            settings,
        );
        return result.data;
    },
};

export { usersClient, APIUsersUrls };
