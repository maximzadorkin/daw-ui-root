import { action, makeAutoObservable, observable } from 'mobx';
import { authClient } from '@shared/api/modules/auth';
import {
    ChangeUserPasswordDto,
    SignInRequestDto,
    SignUpRequestDto,
} from '@shared/api/modules/auth/types';
import { LOCAL_STORAGE_KEYS, localStorage } from '@shared/lib/local-storage';
import { BaseStore } from '@shared/stores/base';
import { HttpStatusCode, isAxiosError } from 'axios';
import { ServerError } from '@shared/api/types';

class AuthStore implements BaseStore {
    constructor() {
        makeAutoObservable(this);
        this._accessToken = localStorage.get(LOCAL_STORAGE_KEYS.accessToken);
    }

    @observable
    private _accessToken: string | null = null;

    @observable
    public get accessToken(): string | null {
        return this._accessToken;
    }

    @observable
    public get isAuth(): boolean {
        return Boolean(this._accessToken);
    }

    @action
    public signUp = async (params: SignUpRequestDto): Promise<void> => {
        localStorage.remove(LOCAL_STORAGE_KEYS.accessToken);
        this._accessToken = null;
        await authClient.signUp(params);
    };

    @action
    public signIn = async (params: SignInRequestDto): Promise<void> => {
        this._accessToken = null;
        localStorage.remove(LOCAL_STORAGE_KEYS.accessToken);
        const response = await authClient.signIn(params);
        this._accessToken = response.accessToken;
        localStorage.set(LOCAL_STORAGE_KEYS.accessToken, this._accessToken);
    };

    @action
    public signOut = async (): Promise<void> => {
        try {
            await authClient.signOut();
            this.clear();
        } catch (error) {
            if (isAxiosError<ServerError>(error)) {
                if (error?.response?.status === HttpStatusCode.Unauthorized) {
                    this.clear();
                }
            }
        }
    };

    @action
    public changePassword = async (
        data: ChangeUserPasswordDto,
    ): Promise<void> => {
        await authClient.changePassword(data);
    };

    @action
    public reset = (): void => {
        this._accessToken = null;
        localStorage.remove(LOCAL_STORAGE_KEYS.accessToken);
    };

    @action
    public clear = (): void => {
        this._accessToken = null;
        localStorage.remove(LOCAL_STORAGE_KEYS.accessToken);
    };
}

const authStore = new AuthStore();

export { AuthStore, authStore };
