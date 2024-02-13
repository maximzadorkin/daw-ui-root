/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AudioNodeStore } from '@shared/stores/audio-node/AudioNodeStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { createID } from '@quarx-ui/core';
import {
    FxStore,
    ProjectContext,
    TrackStore,
    useNewProject,
} from '@shared/stores';
import { TrackType } from '@shared/stores/track/TrackStore';
import { Page } from '@shared/ui/pages';
import { ProjectTimelineThree } from '@widgets/project-timeline';
import { ProjectMainControlsRow } from '@widgets/project-main-controls';
import { MixerPopupBlock } from '@widgets/mixer';
import { useProjectId } from '@entities/project';

const Project = observer(() => {
    const id = useProjectId();
    const store = useNewProject(id);

    return (
        <ProjectContext.Provider value={store}>
            <Page>
                <ProjectMainControlsRow />
                <Canvas linear flat>
                    <ProjectTimelineThree />
                    <pointLight position={[0, 0, 1]} />
                    <OrthographicCamera
                        makeDefault
                        scale={1}
                        position={[0, 0, 1]}
                    />
                </Canvas>
                <MixerPopupBlock />
            </Page>
        </ProjectContext.Provider>
    );
});

export { Project };
