export enum AudioAnalyseWorkerEvents {
    CHANNEL_PEAKS_ANALYSER = 'CHANNEL_PEAKS_ANALYSER',
}

export const AudioAnalyseWorker = new Worker('/workers/analyse.js');
/*
@action
    private generatePeaks = (audioBuffer: AudioBuffer, length: number): void => {
        const buffer = audioBuffer;
        const sampleSize = buffer.length / length;
        const sampleStep = ~~(sampleSize / 10) || 1;
        const channels = buffer.numberOfChannels;
        this.peaks = new Float32Array(length);

        for (let c = 0; c < channels; c++) {
            const channel = buffer.getChannelData(c);

            for (let i = 0; i < length; i++) {

                const start = ~~(i * sampleSize);
                const end = ~~(start + sampleSize);
                let max = 0;

                for (let j = start; j < end; j += sampleStep) {
                    const value = channel[j];
                    if (value > max) {
                        max = value;
                    } else if (-value > max) {
                        max = -value;
                    }
                }

                if (c == 0 || max > this.peaks[i]) {
                    this.peaks[i] = max;
                }

            }

        }
    };
*/
