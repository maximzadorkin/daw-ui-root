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

export type { User };
