import { Track } from '@shared/lib/audio-api';

const renderThreeText = (track: Track, text?: string | null): string => {
    if (!text) {
        return '...';
    }

    if (text !== track.name) {
        return text + '...';
    }

    return text;
};

export { renderThreeText };
