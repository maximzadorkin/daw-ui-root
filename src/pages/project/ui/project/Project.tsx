/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { ProjectContext, useNewProject } from '@shared/stores';
import { Page } from '@shared/ui/pages';
import { ProjectMainControlsRow } from '@widgets/project-main-controls';
import { MixerPopupBlock } from '@widgets/mixer';
import { useProjectId } from '@entities/project';

const Project = () => {
    const id = useProjectId();
    const store = useNewProject(id);

    return (
        <ProjectContext.Provider value={store}>
            <Page>
                <ProjectMainControlsRow />
                <div css={{ height: '100%' }} />
                <MixerPopupBlock />
            </Page>
        </ProjectContext.Provider>
    );
};

export { Project };
