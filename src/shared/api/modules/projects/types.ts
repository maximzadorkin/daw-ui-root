import { User } from '@shared/api/modules/users/types';

interface Project {
    /** ID проекта в формате uuid */
    id: string;

    /** Название проекта */
    name: string;

    /** Дата создания проекта */
    createdAt: string;

    /** Дата обновления проекта */
    updatedAt: string;

    /** Владелец проекта */
    owner: User;
}

export type { Project };
