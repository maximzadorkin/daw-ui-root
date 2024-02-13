import { action, makeAutoObservable, observable } from 'mobx';

class AudioNodeStore {
    @observable
    /** @default 0 */
    public from: number;

    @observable
    /** @default 0 */
    public duration: number;

    @observable
    public userSelected?: boolean;

    @observable
    public isRecording: boolean;

    public constructor(from?: number, duration?: number) {
        makeAutoObservable(this);

        this.from = from ?? 0;
        this.duration = duration ?? 0;
        this.userSelected = false;
        this.isRecording = false;
    }

    @action
    public selectNodeByUser = (): void => {
        this.userSelected = true;
    };

    @action
    public unselectNodeByUser = (): void => {
        this.userSelected = false;
    };

    @action
    public changeFromPoint = (point: number): void => {
        if (this.userSelected) {
            this.from = Math.max(0, point);
        }
    };
}

export { AudioNodeStore };
