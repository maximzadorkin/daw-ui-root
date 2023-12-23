import { ProjectType } from '@entities/project/model/enums';

const mapTypeToTitle: Record<ProjectType, string> = {
    [ProjectType.all]: 'Все проекты пользователя',
    [ProjectType.own]: 'Проекты пользователя',
    [ProjectType.other]: 'Остальные проекты пользователя',
};

export { mapTypeToTitle };
