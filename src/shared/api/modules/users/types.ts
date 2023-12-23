interface User {
    /** ID пользователя */
    id: string;

    /** Логин пользователя */
    username: string;

    /** Имя пользователя */
    name: string;

    /** Фамилия пользователя */
    surname: string;

    /** Дата создания пользователя */
    createdAt: string;

    /** Последнее обновление */
    updatedAt: string;
}

interface ChangeUserSettingsDto {
    /** Логин пользователя */
    username?: string;

    /** Имя пользователя */
    name?: string;

    /** Фамилия пользователя */
    surname?: string;
}

export type { User, ChangeUserSettingsDto };
