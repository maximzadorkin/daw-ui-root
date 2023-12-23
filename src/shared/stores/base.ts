interface BaseStore {
    /** Сброс всех данных хранилища до значений по умолчанию */
    reset(): void;

    /** Обнуление всех данных */
    clear(): void;
}

export type { BaseStore };
