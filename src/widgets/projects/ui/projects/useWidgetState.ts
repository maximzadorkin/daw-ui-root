import { useEffect, useState } from 'react';
import { projectsStore } from '@entities/project/model/projectsStore';
import { isAxiosError } from 'axios';
import { ServerError } from '@shared/api/types';
import { Simulate } from 'react-dom/test-utils';
import { ProjectsProps } from '@widgets/projects/ui/projects/types';

enum ProjectWidgetState {
    initial,
    error,
    loading,
    notFound,
    viewer,
}

interface UseWidgetStateReturns {
    state: ProjectWidgetState;
    error?: string;
}

const useWidgetState = ({ type }: ProjectsProps): UseWidgetStateReturns => {
    const [loadingError, setLoadingError] = useState<string>();
    let state = ProjectWidgetState.initial;

    useEffect(() => {
        try {
            projectsStore.fetchProjectsByType(type).finally();
        } catch (error) {
            if (isAxiosError<ServerError>(error)) {
                setLoadingError(error.response?.data.message ?? error.message);
            }
        }
        return () => projectsStore.reset();
    }, []);

    if (projectsStore.loading) {
        state = ProjectWidgetState.loading;
    } else if (loadingError) {
        state = ProjectWidgetState.error;
    } else if (projectsStore.projects?.length === 0) {
        state = ProjectWidgetState.notFound;
    } else if (projectsStore.projects?.length ?? 0 > 0) {
        state = ProjectWidgetState.viewer;
    }

    return {
        state,
        error: loadingError,
    };
};

export { useWidgetState, ProjectWidgetState };
