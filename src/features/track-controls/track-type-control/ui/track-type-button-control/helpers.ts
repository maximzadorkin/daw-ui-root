import { useMemo } from 'react';
import { SelectorOption } from '@shared/components/button-selector';

const useTrackTypeOption = (): SelectorOption[] =>
    useMemo(
        () =>
            Object.values(['audio']).map((type) => ({
                value: type,
                title: type,
            })),
        [],
    );

export { useTrackTypeOption };
