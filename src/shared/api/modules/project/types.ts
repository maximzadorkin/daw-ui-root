import { PaletteColor } from '@quarx-ui/core';

interface AudioDto {
    id: string;

    link: string;

    sha: string;

    offset: number;
}

interface TrackDto {
    id: string;

    name: string;

    color: Exclude<PaletteColor, 'danger'>;

    audios?: AudioDto[] | null;
}

interface ProjectDto {
    id: string;

    tracks?: TrackDto[] | null;
}

interface AddTrackDto {
    name: string;

    color: Exclude<PaletteColor, 'danger'>;
}

export type { ProjectDto, TrackDto, AudioDto };
export type { AddTrackDto };
