import { action, makeAutoObservable } from 'mobx';

export default class {
    private secondToPoint = 20;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    public secondsToPoints = (seconds: number): number => {
        return this.secondToPoint * seconds;
    };

    @action
    public pointsToSeconds = (points: number): number => {
        return points / this.secondToPoint;
    };
}
