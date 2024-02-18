import { Audio, AudioConstructorProps } from '@shared/lib/audio/Audio';
import { makeObservable, observable } from 'mobx';

export interface AudioViewModelConstructorProps extends AudioConstructorProps {}

const ObservableProps = {
    isUserSelected: observable,
};

export class AudioViewModel extends Audio {
    public isUserSelected: boolean;

    constructor(props: AudioViewModelConstructorProps) {
        super(props);

        this.isUserSelected = false;

        this.observeThis();
        makeObservable(this, ObservableProps);
    }
}
