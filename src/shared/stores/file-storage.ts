export class FileStorage {
    public addProject = async (projectId: string): Promise<void> => {
        await this.getProjectHandler(projectId);
    };

    public removeProject = async (projectId: string): Promise<void> => {
        const root = await this.getRootHandler();
        await root.removeEntry(projectId, { recursive: true });
    };

    public addTrack = async (
        projectId: string,
        trackId: string,
    ): Promise<void> => {
        await this.getTrackHandler(projectId, trackId);
    };

    public removeTrack = async (
        projectId: string,
        trackId: string,
    ): Promise<void> => {
        const projectHandler = await this.getProjectHandler(projectId);
        const trackHandler = await projectHandler.getFileHandle(trackId);
        await projectHandler.removeEntry(trackHandler.name, {
            recursive: true,
        });
    };

    public addAudio = async (
        projectId: string,
        trackId: string,
        audioId: string,
        audio: ArrayBuffer | Blob,
    ): Promise<void> => {
        let writeHandler: FileSystemWritableFileStream | undefined;
        try {
            await this.removeAudio(projectId, trackId, audioId);
        } catch (error) {
            console.error('Невозможно удалить файл.', error);
        }
        try {
            const audioHandler = await this.getAudioHandler(
                projectId,
                trackId,
                audioId,
            );
            writeHandler = await audioHandler.createWritable();
            await writeHandler.write(audio);
        } catch (error) {
            throw error;
        } finally {
            await writeHandler?.close();
        }
    };

    public getAudio = async (
        projectId: string,
        trackId: string,
        audioId: string,
        sha: string,
    ): Promise<ArrayBuffer | undefined> => {
        try {
            const track = await this.getTrackHandler(projectId, trackId);
            const audio = await track.getFileHandle(audioId, { create: false });
            const file = await audio.getFile();
            // Todo: Тут должно быть сравнение по sha
            return await file.arrayBuffer();
        } catch (e) {
            return undefined;
        }
    };

    public removeAudio = async (
        projectId: string,
        trackId: string,
        audioId: string,
    ): Promise<void> => {
        const trackHandler = await this.getTrackHandler(projectId, trackId);
        const audioHandler = await trackHandler.getFileHandle(audioId, {
            create: true,
        });
        await trackHandler.removeEntry(audioHandler.name);
    };

    private getAudioHandler = async (
        projectId: string,
        trackId: string,
        audioId: string,
    ): Promise<FileSystemFileHandle> =>
        (await this.getTrackHandler(projectId, trackId)).getFileHandle(
            audioId,
            { create: true },
        );

    private getTrackHandler = async (
        projectId: string,
        trackId: string,
    ): Promise<FileSystemDirectoryHandle> =>
        (await this.getProjectHandler(projectId)).getDirectoryHandle(trackId, {
            create: true,
        });

    private getProjectHandler = async (
        projectId: string,
    ): Promise<FileSystemDirectoryHandle> =>
        (await this.getRootHandler()).getDirectoryHandle(projectId, {
            create: true,
        });

    private getRootHandler = async (): Promise<FileSystemDirectoryHandle> =>
        await navigator.storage.getDirectory();
}

export const filesStorage = new FileStorage();
