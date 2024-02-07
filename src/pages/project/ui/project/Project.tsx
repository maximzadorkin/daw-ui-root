import React from 'react';
import { Page } from '@shared/ui/pages';
import { ProjectMainControlsRow } from '@widgets/project-main-controls';
import { useProjectId } from '@entities/project';

const Project = () => {
    const id = useProjectId();
    return (
        <Page>
            <ProjectMainControlsRow />
        </Page>
    );
};

export { Project };
