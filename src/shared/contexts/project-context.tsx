import { isNil } from 'lodash';
import { when } from 'mobx';
import { createContext, useContext, useEffect, useState } from 'react';
import { Project } from '@shared/lib/audio-api/Project';
import { projectClient } from '@shared/api/modules/project/client';
import { Audio, Track } from '@shared/lib/audio-api';

const ProjectContext = createContext<Project>(
    new Project({ id: '', context: new AudioContext() }),
);

const useProject = () => useContext<Project>(ProjectContext);

const prepareInitialProjectData = (
    projectId: string,
    onPrepared: (project: Project) => void,
): void => {
    void projectClient.fetchInfo(projectId, (serverData) => {
        const webAudioContext = new AudioContext();
        onPrepared(
            new Project({
                id: projectId,
                context: webAudioContext,
                tracks: serverData.tracks?.map(
                    (track) =>
                        new Track({
                            id: track.id,
                            name: track.name,
                            color: track.color,
                            context: webAudioContext,
                            audios: track.audios?.map(
                                (audio) =>
                                    new Audio({
                                        id: audio.id,
                                        offset: audio.offset,
                                        context: webAudioContext,
                                        src: {
                                            link: audio.link,
                                            sha: audio.sha,
                                            relatedInfo: {
                                                projectId,
                                                trackId: track.id,
                                            },
                                        },
                                    }),
                            ),
                        }),
                ),
            }),
        );
    });
};

const useNewProject = (
    id?: string | null,
): { loading: boolean; project: Project | undefined } => {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        if (isNil(id)) {
            setProject(undefined);
            return;
        }

        void projectClient.connect();
        when(
            () => projectClient.connected,
            () =>
                prepareInitialProjectData(id, (prepared) => {
                    setProject(prepared);
                    setLoading(false);
                }),
        );

        return projectClient.disconnect;
    }, [id]);

    return {
        loading,
        project: loading ? undefined : project,
    };
};

export { ProjectContext, useProject, useNewProject };
