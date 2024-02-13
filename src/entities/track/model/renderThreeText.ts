import { TrackStore } from '@shared/stores';

const renderThreeText = (track: TrackStore, text?: string | null): string => {
    if (!text) {
        return '...';
    }

    if (text !== track.name) {
        return text + '...';
    }

    return text;
};

export { renderThreeText };
