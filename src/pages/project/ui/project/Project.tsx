import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import {
    ProjectViewModelContext,
    useNewProjectViewModel,
} from '@shared/stores';
import { Lamp } from '@shared/ui/Lamp';
import { Page, PageCenter } from '@shared/ui/pages';
import { ProjectMainControlsRow } from '@widgets/project-main-controls';
import { ProjectTimelineThree } from '@widgets/project-timeline';
import { MixerPopupBlock } from '@widgets/mixer';
import { useProjectId } from '@entities/project';

const Project: FC = observer(() => {
    const id = useProjectId();
    const store = useNewProjectViewModel(id);

    if (!store) {
        return (
            <PageCenter>
                <Lamp />
            </PageCenter>
        );
    }

    return (
        <ProjectViewModelContext.Provider value={store}>
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
        </ProjectViewModelContext.Provider>
    );
});

export { Project };
