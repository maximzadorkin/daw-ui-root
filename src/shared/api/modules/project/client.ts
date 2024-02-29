import { action, computed, makeObservable, observable } from 'mobx';
import { authStore } from '../../../stores/auth';
import { AddTrackDto, ProjectDto, TrackDto } from './types';
import { io, Socket } from 'socket.io-client';

class ProjectClient {
    private static readonly host = 'ws://localhost:3010/project';

    private socket?: Socket;

    @observable
    public connected: boolean;

    constructor() {
        this.connected = false;
        makeObservable(this);
    }

    @action
    connect = async (): Promise<void> => {
        this.connected = true;
        // this.socket = io(ProjectClient.host, {
        //     autoConnect: true,
        //     auth: {
        //         Authorization: `Bearer ${authStore.accessToken}`,
        //     },
        // });
        //
        // this.socket.on('connect', () => {
        //     this.connected = true;
        // });
        //
        // this.socket.on('disconnect', () => {
        //     this.connected = false;
        //     this.socket?.connect().on('connect_error', () => {
        //         this.socket?.connect();
        //     });
        // });

        // this.socket.connect();
    };

    @action
    public disconnect = () => {
        this.socket?.disconnect();
        this.connected = false;
    };

    @action
    fetchInfo = (projectId: string, onFetched: (info: ProjectDto) => void) => {
        // this.socket?.emit('join', projectId, (data: string) =>
        //     onFetched(JSON.parse(data)),
        // );

        onFetched({
            id: projectId,
            tracks: [
                {
                    id: '1',
                    name: 'test track name',
                    color: 'secondary',
                    audios: [
                        {
                            id: 'audio-1',
                            offset: 0,
                            sha: '',
                            link: '/sound.mp3',
                        },
                    ],
                },
            ],
        });
    };

    @action
    public addTrack = (
        dto: AddTrackDto,
        onDone: (dto: TrackDto) => void,
    ): void => {
        this.socket?.emit('add-track', dto, onDone);
    };

    @action
    public removeTrack = (trackId: string, onDone: () => void): void => {
        this.socket?.emit('remove-track', { id: trackId }, onDone);
    };

    @action
    public removeAudio = (audioId: string, onDone: () => void): void => {
        this.socket?.emit('remove-audio', { id: audioId }, onDone);
    };
}

export const projectClient = new ProjectClient();
