import { action, extendObservable, makeObservable, observable } from 'mobx';
import { Project, ProjectConstructorProps } from '@shared/lib/audio/Project';
import { TrackType, TrackViewModel } from './TrackViewModel';
import { AudioViewModel } from './AudioViewModel';

interface ProjectViewModelConstructor
    extends ProjectConstructorProps<TrackViewModel, AudioViewModel> {}

const ProjectViewModelObservableProps = {
    viewMixer: observable,
    // viewFx: observable,
    INIT_MOCKS_DATA: action,
};

export class ProjectViewModel extends Project<TrackViewModel, AudioViewModel> {
    public viewMixer: boolean = true;

    // public viewFx?: FxStore;

    constructor(props: ProjectViewModelConstructor) {
        super(props);

        this.observeThis();
        makeObservable(this, ProjectViewModelObservableProps);

        this.INIT_MOCKS_DATA();
    }

    private INIT_MOCKS_DATA = (): void => {
        const context = this.context;

        const panLeft = new PannerNode(context);
        panLeft.positionX.value = -10;
        const panRight = new PannerNode(context);
        panRight.positionX.value = 5;

        this.addTrack(
            new TrackViewModel({
                id: '1',
                name: '1',
                type: TrackType.audio,
                context,
                audios: [
                    new AudioViewModel({
                        id: '1',
                        src: '/sound.mp3',
                        context,
                        offset: 0,
                    }),
                    // new AudioViewModel({
                    //     id: '2',
                    //     src: '/sound.mp3',
                    //     context,
                    //     offset: 2,
                    // }),
                ],
            }),
        );
        this.addTrack(
            new TrackViewModel({
                id: '2',
                context,
                name: '2',
                type: TrackType.audio,
                audios: [
                    new AudioViewModel({
                        id: '1',
                        src: '/sound.mp3',
                        context,
                        offset: 0.01,
                    }),
                ],
            }),
        );
    };
}
