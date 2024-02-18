import { isNil } from 'lodash';
import { createContext, useContext, useMemo } from 'react';
import { ProjectViewModel } from './ProjectViewModel';

const ProjectViewModelContext = createContext<ProjectViewModel>(
    new ProjectViewModel({ id: '' }),
);

const useProjectViewModel = () =>
    useContext<ProjectViewModel>(ProjectViewModelContext);

const useNewProjectViewModel = (
    id?: string | null,
): ProjectViewModel | undefined =>
    useMemo(() => (isNil(id) ? undefined : new ProjectViewModel({ id })), [id]);

export { ProjectViewModelContext, useProjectViewModel, useNewProjectViewModel };
