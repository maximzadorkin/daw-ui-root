import { PAGES_PATHS } from '@shared/lib/pages.paths.register';

interface Page {
    path: PAGES_PATHS;

    text: string;

    description?: string;
}

const PAGES: Page[] = [
    { path: PAGES_PATHS.ownProjects, text: 'Мои проекты' },
    {
        path: PAGES_PATHS.otherProjects,
        text: 'Общие проекты',
    },
    { path: PAGES_PATHS.allProjects, text: 'Все проекты' },
];

export { PAGES };
