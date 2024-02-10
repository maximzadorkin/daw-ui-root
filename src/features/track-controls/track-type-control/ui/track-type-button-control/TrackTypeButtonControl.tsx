/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import {
    ButtonSelector,
    SelectorOption,
} from '@shared/components/button-selector';
import { TrackType } from '@shared/stores/track/TrackStore';
import { useTrackTypeOption } from './helpers';
import { TrackTypeButtonControlProps } from './types';

const TrackTypeButtonControl: FC<TrackTypeButtonControlProps> = observer(
    ({ track }) => {
        const options = useTrackTypeOption();
        const selected = options.find(({ value }) => value === track.type);

        const onChangeType = action(
            (option: SelectorOption<TrackType>): void => {
                track.type = option.value;
            },
        );

        return (
            <ButtonSelector
                selectedPrefix="Тип: "
                selected={selected}
                options={options}
                onChange={onChangeType}
                css={{ width: '100%' }}
            />
        );
    },
);

export { TrackTypeButtonControl };
