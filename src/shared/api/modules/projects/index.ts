import { httpClient } from '@shared/api/client';
import { Project } from './types';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';

enum APIProjectsUrls {
    gelAllProjects = '/projects',
    getOwnUserProjects = '/projects/own',
    getOthersUserProjects = '/projects/others',
    createProject = '/projects',
    deleteProject = '/projects',
}

const projectsClient = {
    getAllProjects: async (): Promise<Project[]> => {
        const result = await httpClient.get<Project[]>(
            APIProjectsUrls.gelAllProjects,
        );
        return result.data;
    },

    getOwnUserProjects: async (): Promise<Project[]> => {
        const result = await httpClient.get<Project[]>(
            APIProjectsUrls.getOwnUserProjects,
        );
        return result.data;
    },

    getOthersUserProjects: async (): Promise<Project[]> => {
        const result = await httpClient.get<Project[]>(
            APIProjectsUrls.getOthersUserProjects,
        );
        return result.data;
    },

    createProject: async (
        createProjectDto: CreateProjectDto,
    ): Promise<void> => {
        await httpClient.post<void>(
            APIProjectsUrls.createProject,
            createProjectDto,
        );
    },

    deleteProject: async (
        deleteProjectDto: DeleteProjectDto,
    ): Promise<void> => {
        console.log('DELETE');
        await httpClient.delete<void>(APIProjectsUrls.deleteProject, {
            data: deleteProjectDto,
        });
    },
};

export { projectsClient, APIProjectsUrls };
