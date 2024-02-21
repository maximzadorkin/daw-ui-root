import { Project } from './Project';
import { Track } from './Track';
import { Audio } from './Audio';

export { MediaDevices } from './MediaDevices';
export { Record } from './Record';
export { Audio } from './Audio';
export { RecordingAudio } from './RecordingAudio';
export { Track } from './Track';
export { Project };

export const initMocks = (project: Project): void => {
    const context = project.context;

    project.addTrack(
        new Track({
            id: '1',
            name: '1',
            context,
            audios: [
                new Audio({
                    id: '1',
                    src: '/sound.mp3',
                    context,
                    offset: 5,
                }),
                // new Audio({
                //     id: '2',
                //     src: '/sound.mp3',
                //     context,
                //     offset: 2,
                // }),
            ],
        }),
    );
    /*
    project.addTrack(
        new Track({
            id: '2',
            context,
            name: '2',
            audios: [
                new Audio({
                    id: '1',
                    src: '/sound.mp3',
                    context,
                    offset: 0.01,
                }),
            ],
        }),
    );
    project.addTrack(
        new Track({
            id: '3',
            context,
            name: 'for record',
        }),
    );
     */
};
