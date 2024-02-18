import { useMemo } from 'react';
import { SelectorOption } from '@shared/components/button-selector';
import { TrackType } from '@shared/stores';

const useTrackTypeOption = (): SelectorOption<TrackType>[] =>
    useMemo(
        () =>
            Object.values(TrackType).map((type) => ({
                value: type,
                title: type,
            })),
        [],
    );

export { useTrackTypeOption };
