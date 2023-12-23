import { httpClient } from '@shared/api/client';
import { User } from '../users/types';
import {
    ChangeUserPasswordDto,
    SignInRequestDto,
    SignInResponseDto,
    SignUpRequestDto,
} from './types';

enum APIAuthUrls {
    signUp = '/auth/sign-up',
    signIn = '/auth/sign-in',
    signOut = '/auth/sign-out',
    changePassword = '/auth/password',
}

const authClient = {
    signUp: async (params: SignUpRequestDto): Promise<void> => {
        await httpClient.post(APIAuthUrls.signUp, params);
    },

    signIn: async (params: SignInRequestDto): Promise<SignInResponseDto> => {
        const result = await httpClient.post<SignInResponseDto>(
            APIAuthUrls.signIn,
            params,
        );
        return result.data;
    },

    signOut: async (): Promise<void> => {
        await httpClient.post(APIAuthUrls.signOut);
    },

    changePassword: async (data: ChangeUserPasswordDto): Promise<User> => {
        const result = await httpClient.put<User>(
            APIAuthUrls.changePassword,
            data,
        );
        return result.data;
    },
};

export { authClient, APIAuthUrls };
