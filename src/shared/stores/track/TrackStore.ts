import { action, makeAutoObservable, observable } from 'mobx';
import { FxStore } from '../fx/FxStore';

enum TrackType {
    audio = 'audio',
    midi = 'midi',
}

class TrackStore {
    @observable
    type: TrackType;

    @observable
    input: string;

    @observable
    fx: FxStore[];

    constructor(type: TrackType, input: string) {
        makeAutoObservable(this);

        this.type = type ?? TrackType.audio;
        this.input = input;
        this.fx = [];
    }

    @action
    public addFx = (fx: FxStore): void => {
        this.fx.push(fx);
    };

    @action
    public removeFx = (removable: FxStore): void => {
        this.fx = this.fx.filter((fx) => fx !== removable);
    };
}

export { TrackStore };
