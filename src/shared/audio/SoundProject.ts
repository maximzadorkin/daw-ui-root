// AudioBufferSourceNode for every mp3 на каждом треке. трек сборник таких буферов
import { BaseStore } from '../stores/base';

export default class implements BaseStore {
    private context: AudioContext;
    private tracks: Array<AudioBufferSourceNode>;

    private settings: object; // тут хранить playTime(на какой секунде поспроизводим)

    constructor() {
        this.context = new AudioContext();
        this.tracks = [];
    }

    public play = async (): Promise<void> => {
        this.tracks.forEach((track) => track.start(0, 0));
    };

    public resume = async (): Promise<void> => {
        this.tracks.forEach((track) => track.stop());
    };

    public stop = async (): Promise<void> => {
        // this.tracks[0].buffer
        this.tracks.forEach((track) => track.stop(0));
    };

    public clear = async (): Promise<void> => {};

    public reset = async (): Promise<void> => {};
}
