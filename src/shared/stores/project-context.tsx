import { isNil } from 'lodash';
import { createContext, useContext, useMemo } from 'react';
import { Project } from '@shared/lib/audio-context/Project';

const ProjectContext = createContext<Project>(new Project({ id: '' }));

const useProject = () => useContext<Project>(ProjectContext);

const useNewProject = (id?: string | null): Project | undefined =>
    useMemo(() => (isNil(id) ? undefined : new Project({ id })), [id]);

export { ProjectContext, useProject, useNewProject };
