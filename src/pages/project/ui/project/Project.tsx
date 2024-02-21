import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { ProjectContext, ProjectControls, useNewProject } from '@shared/stores';
import { Lamp } from '@shared/ui/Lamp';
import { Page, PageCenter } from '@shared/ui/pages';
import { ProjectMainControlsRow } from '@widgets/project-main-controls';
import { ProjectTimelineThree } from '@widgets/project-timeline';
import { MixerPopupBlock } from '@widgets/mixer';
import { useProjectId } from '@entities/project';

import { initMocks } from '@shared/lib/audio-context';

const Project: FC = observer(() => {
    const id = useProjectId();
    const project = useNewProject(id);

    useEffect(() => {
        if (project) {
            initMocks(project);
        }
    }, [project]);

    if (!project) {
        return (
            <PageCenter>
                <Lamp />
            </PageCenter>
        );
    }

    return (
        <ProjectContext.Provider value={project}>
            <ProjectControls>
                <Page>
                    <ProjectMainControlsRow />
                    <Canvas linear flat>
                        <ProjectTimelineThree />
                        <pointLight position={[0, 0, 1]} />
                        <OrthographicCamera
                            makeDefault
                            scale={1}
                            position={[0, 0, 10]}
                        />
                    </Canvas>
                    <MixerPopupBlock />
                </Page>
            </ProjectControls>
        </ProjectContext.Provider>
    );
});

export { Project };
