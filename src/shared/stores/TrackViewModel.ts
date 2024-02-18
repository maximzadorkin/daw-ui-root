import { makeObservable, observable } from 'mobx';
import { PALETTE_COLORS, PaletteColor } from '@quarx-ui/core';
import { Track, TrackConstructorProps } from '@shared/lib/audio/Track';
import { AudioViewModel } from './AudioViewModel';

enum TrackType {
    audio = 'audio',
    midi = 'midi',
}

interface TrackViewModelConstructorProps
    extends TrackConstructorProps<AudioViewModel> {
    type: TrackType;
    name: string;
    input?: InputDeviceInfo;
    color?: Exclude<PaletteColor, 'danger'>;
}

const ObservableProps = {
    name: observable,
    type: observable,
    input: observable,
    recordable: observable,
    color: observable,
};

class TrackViewModel extends Track<AudioViewModel> {
    public name: string;

    public type: TrackType;

    public input?: InputDeviceInfo;

    public recordable: boolean;

    public color: Exclude<PaletteColor, 'danger'>;

    constructor({
        type,
        name,
        input,
        ...props
    }: TrackViewModelConstructorProps) {
        super(props);

        this.observeThis();
        makeObservable(this, ObservableProps);

        this.type = type ?? TrackType.audio;
        this.name = name;
        this.input = input;
        this.recordable = false;

        this.color = Object.values(PALETTE_COLORS).filter(
            (v) => v !== 'danger',
        )[
            Math.min(Math.max(Math.ceil(Math.random() * 5) - 1, 0), 5)
        ] as unknown as Exclude<PaletteColor, 'danger'>;
    }
}

export { TrackType, TrackViewModel };
