import { SyncContextMap } from './types';

export enum MessageType {
    syncContext = 'syncContext',
    addProject = 'addProject',
    removeProject = 'removeProject',
    addTrack = 'addTrack',
    removeTrack = 'removeTrack',
    addAudio = 'addAudio',
    getAudio = 'getAudio',
    removeAudio = 'removeAudio',
}

export interface FileSyncSystemDto<
    Type extends MessageType,
    Info extends object = object,
> {
    id: string;

    type: Type;

    info: Info;
}

export type SyncContextDto = FileSyncSystemDto<
    MessageType.syncContext,
    {
        projectId: string;
        context: SyncContextMap;
    }
>;

export type AddProjectDto = FileSyncSystemDto<
    MessageType.syncContext,
    {
        projectId: string;
    }
>;

export type RemoveProjectDto = FileSyncSystemDto<
    MessageType.syncContext,
    {
        projectId: string;
    }
>;

export type AddTrackDto = FileSyncSystemDto<
    MessageType.addTrack,
    {
        projectId: string;

        trackId: string;
    }
>;

export type RemoveTrackDto = FileSyncSystemDto<
    MessageType.addTrack,
    {
        projectId: string;

        trackId: string;
    }
>;

export type AddAudioDto = FileSyncSystemDto<
    MessageType.addAudio,
    {
        projectId: string;

        trackId: string;

        audioId: string;

        audio: ArrayBuffer | Blob;
    }
>;

export type GetAudioDto = FileSyncSystemDto<
    MessageType.getAudio,
    {
        projectId: string;

        trackId: string;

        audioId: string;
    }
>;

export type RemoveAudioDto = FileSyncSystemDto<
    MessageType.removeAudio,
    {
        projectId: string;

        trackId: string;

        audioId: string;
    }
>;

export type FileSyncSystemDtos =
    | SyncContextDto
    | AddProjectDto
    | RemoveProjectDto
    | AddTrackDto
    | RemoveTrackDto
    | AddAudioDto
    | GetAudioDto
    | RemoveAudioDto;
