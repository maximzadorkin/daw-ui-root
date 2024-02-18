enum MessageType {
    CHANNEL_PEAKS_ANALYSER = 'CHANNEL_PEAKS_ANALYSER',
}

type PeakAnalyseMessage = MessageEvent<{
    type: MessageType.CHANNEL_PEAKS_ANALYSER;
    /** Количество итоговых точек */
    length: number;
    audioBuffer: {
        /** Длина буфера */
        length: number;
        /** Данные канала */
        channel: Float32Array;
    };
}>;

type Messages = PeakAnalyseMessage;

const generatePeaksForChannel = (message: PeakAnalyseMessage): Float32Array => {
    const { length, channel } = message.data.audioBuffer;
    const sampleSize = length / message.data.length;
    const sampleStep = ~~(sampleSize / 10) || 1;
    const peaks = new Float32Array(message.data.length);

    for (let i = 0; i < message.data.length; i++) {
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

        if (max > peaks[i]) {
            peaks[i] = max;
        }
    }

    return peaks;
};

onmessage = (message: Messages) => {
    switch (message.data.type) {
        case MessageType.CHANNEL_PEAKS_ANALYSER:
            postMessage({
                type: MessageType.CHANNEL_PEAKS_ANALYSER,
                data: generatePeaksForChannel(message),
            });
            return;
    }
};
