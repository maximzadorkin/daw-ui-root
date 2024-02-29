import { FileStorage } from './file-storage';
import {
    AddAudioDto,
    AddProjectDto,
    AddTrackDto,
    FileSyncSystemDtos,
    GetAudioDto,
    MessageType,
    RemoveAudioDto,
    RemoveProjectDto,
    RemoveTrackDto,
    SyncContextDto,
} from './types.dto';

class SyncSystem {
    private storage = new FileStorage();

    public syncContextEvent = async (data: SyncContextDto): Promise<void> => {
        const { projectId, context } = data.info;
        const info = await this.storage.syncContext(projectId, context);
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public addProject = async (data: AddProjectDto): Promise<void> => {
        const { projectId } = data.info;
        const info = await this.storage.addProject(projectId);
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public removeProject = async (data: RemoveProjectDto): Promise<void> => {
        const { projectId } = data.info;
        const info = await this.storage.removeProject(projectId);
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public addTrack = async (data: AddTrackDto): Promise<void> => {
        const { projectId, trackId } = data.info;
        const info = await this.storage.addTrack(projectId, trackId);
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public removeTrack = async (data: RemoveTrackDto): Promise<void> => {
        const { projectId, trackId } = data.info;
        const info = await this.storage.removeTrack(projectId, trackId);
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public addAudio = async (data: AddAudioDto): Promise<void> => {
        const { projectId, trackId, audioId, audio } = data.info;
        const info = await this.storage.addAudio(
            projectId,
            trackId,
            audioId,
            audio,
        );
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public getAudio = async (data: GetAudioDto): Promise<void> => {
        const { projectId, trackId, audioId } = data.info;
        const info = await this.storage.getAudio(projectId, trackId, audioId);
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    public removeAudio = async (data: RemoveAudioDto): Promise<void> => {
        const { projectId, trackId, audioId } = data.info;
        const info = await this.storage.removeAudio(
            projectId,
            trackId,
            audioId,
        );
        postMessage({ ...this.createBaseAnswerFromDto(data), info });
    };

    private createBaseAnswerFromDto = (
        data: FileSyncSystemDtos,
    ): {
        id: string;
        type: MessageType;
    } => ({
        id: data.id,
        type: data.type,
    });
}

const syncSystem = new SyncSystem();
onmessage = async ({ data }: MessageEvent<FileSyncSystemDtos>) => {
    const actions: Record<MessageType, () => void> = {
        [MessageType.syncContext]: () => {
            void syncSystem.syncContextEvent(data as SyncContextDto);
        },
        [MessageType.addProject]: () => {
            void syncSystem.addProject(data as AddProjectDto);
        },
        [MessageType.removeProject]: () => {
            void syncSystem.removeProject(data as RemoveProjectDto);
        },
        [MessageType.addTrack]: () => {
            void syncSystem.addTrack(data as AddTrackDto);
        },
        [MessageType.removeTrack]: () => {
            void syncSystem.removeTrack(data as RemoveTrackDto);
        },
        [MessageType.addAudio]: () => {
            void syncSystem.addAudio(data as AddAudioDto);
        },
        [MessageType.getAudio]: () => {
            void syncSystem.getAudio(data as GetAudioDto);
        },
        [MessageType.removeAudio]: () => {
            void syncSystem.removeAudio(data as RemoveAudioDto);
        },
    };

    actions[data.type]();
};
