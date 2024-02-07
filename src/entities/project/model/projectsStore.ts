import { action, makeAutoObservable, observable } from 'mobx';
import { Project } from '@shared/api/modules/projects/types';
import { projectsClient } from '@shared/api/modules/projects';
import { BaseStore } from '@shared/stores/base';
import { CreateProjectDto } from '@shared/api/modules/projects/dto/create-project.dto';
import { DeleteProjectDto } from '@shared/api/modules/projects/dto/delete-project.dto';
import { ProjectType } from '@entities/project/model/enums';

class ProjectsStore implements BaseStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable
    public projects: Project[] | null = null;

    @observable
    private lastFetchCallback: (() => Promise<void>) | null = null;

    @observable
    public loading: boolean = false;

    @action
    public fetchAllUserProjects = async (): Promise<void> => {
        if (this.loading) {
            return;
        }

        try {
            this.loading = true;
            this.lastFetchCallback = this.fetchAllUserProjects;
            this.projects = null;
            this.projects = await projectsClient.getAllProjects();
        } catch (error) {
            throw error;
        } finally {
            this.loading = false;
        }
    };

    @action
    public fetchOwnUserProjects = async (): Promise<void> => {
        if (this.loading) {
            return;
        }

        try {
            this.loading = true;
            this.lastFetchCallback = this.fetchOwnUserProjects;
            this.projects = null;
            this.projects = await projectsClient.getOwnUserProjects();
        } catch (error) {
            throw error;
        } finally {
            this.loading = false;
        }
    };

    @action
    public fetchOtherUserProjects = async (): Promise<void> => {
        if (this.loading) {
            return;
        }

        try {
            this.loading = true;
            this.lastFetchCallback = this.fetchOtherUserProjects;
            this.projects = null;
            this.projects = await projectsClient.getOthersUserProjects();
        } catch (error) {
            throw error;
        } finally {
            this.loading = false;
        }
    };

    @action
    public fetchProjectsByType = async (type: ProjectType): Promise<void> => {
        switch (type) {
            case ProjectType.own:
                return await this.fetchOwnUserProjects();
            case ProjectType.other:
                return await this.fetchOtherUserProjects();
            case ProjectType.all:
            default:
                return await this.fetchAllUserProjects();
        }
    };

    @action
    public refetch = async (): Promise<void> => {
        this.lastFetchCallback?.();
    };

    @action
    public createProject = async (
        createProjectDTO: CreateProjectDto,
    ): Promise<void> => {
        await projectsClient.createProject(createProjectDTO);
    };

    @action
    public deleteProject = async (
        deleteProjectDTO: DeleteProjectDto,
    ): Promise<void> => {
        await projectsClient.deleteProject(deleteProjectDTO);
    };

    public clear = (): void => {
        this.projects = null;
        this.loading = false;
        this.lastFetchCallback = null;
    };

    public reset = (): void => {
        this.clear();
    };
}

const projectsStore = new ProjectsStore();

export { projectsStore };
