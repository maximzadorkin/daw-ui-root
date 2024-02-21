import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useMemo,
} from 'react';
import { action, computed, makeObservable, observable } from 'mobx';
import { Audio, Track } from '@shared/lib/audio-context';

class ProjectControlsState {
    @observable
    public viewMixer: boolean = true;

    @observable
    public viewFx?: {} = undefined; // class Fx {}

    @observable
    public selectedAudios: Audio[] = [];

    @observable
    public recordableTracks: Track[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    public isSelectedAudio = (id: string): boolean =>
        this.selectedAudios.map((audio) => audio.id).includes(id);

    @action
    public removeAudioFromSelected = (id: string): void => {
        this.selectedAudios = this.selectedAudios.filter(
            (audio) => audio.id !== id,
        );
    };

    @observable
    public isRecordableTrack = (id: string): boolean =>
        this.recordableTracks.map((track) => track.id).includes(id);

    @action
    public addTrackToRecordable = (track: Track): void => {
        if (!this.isRecordableTrack(track.id)) {
            this.recordableTracks.push(track);
        }
    };

    @action
    public removeTrackFromRecordable = (id: string): void => {
        this.recordableTracks = this.recordableTracks.filter(
            (track) => track.id !== id,
        );
    };
}

const ProjectControlsContext = createContext(new ProjectControlsState());

const useProjectControls = () => useContext(ProjectControlsContext);

const ProjectControls: FC<{ children: ReactNode }> = ({ children }) => {
    const controls = useMemo(() => new ProjectControlsState(), []);

    return (
        <ProjectControlsContext.Provider value={controls}>
            {children}
        </ProjectControlsContext.Provider>
    );
};

export { ProjectControls, useProjectControls };
