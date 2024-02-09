import { createContext, useContext, useMemo } from 'react';
import { ProjectStore } from './ProjectStore';

const ProjectContext = createContext<ProjectStore>(new ProjectStore());

const useProjectStore = () => useContext(ProjectContext);

const useNewProject = (id?: string | null): ProjectStore =>
    useMemo(() => new ProjectStore(id), []);

export { ProjectContext, useProjectStore, useNewProject };
