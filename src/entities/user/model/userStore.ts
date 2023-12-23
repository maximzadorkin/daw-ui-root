import { action, makeAutoObservable, observable } from 'mobx';
import { BaseStore } from '@shared/stores/base';
import { usersClient } from '@shared/api/modules/users';
import { ChangeUserSettingsDto, User } from '@shared/api/modules/users/types';

class UserStore implements BaseStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable
    private _currentUser: User | null = null;

    @observable
    loadingCurrentUser: boolean = false;

    @observable
    public get currentUser(): User | null {
        return this._currentUser;
    }

    @action
    public getMe = async () => {
        try {
            this.loadingCurrentUser = true;
            this._currentUser = await usersClient.getMe();
        } catch (error) {
            throw error;
        } finally {
            this.loadingCurrentUser = false;
        }
    };

    @action
    public changeSettings = async (
        settings: ChangeUserSettingsDto,
    ): Promise<User> => {
        this._currentUser = await usersClient.changeSettings(settings);
        return this._currentUser;
    };

    @action
    public clear = () => {
        this._currentUser = null;
        this.loadingCurrentUser = false;
    };

    @action
    public reset = () => {
        this._currentUser = null;
        this.loadingCurrentUser = false;
    };
}

const userStore = new UserStore();

export { UserStore, userStore };
