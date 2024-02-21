/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import {
    ButtonSelector,
    SelectorOption,
} from '@shared/components/button-selector';
import { useTrackTypeOption } from './helpers';
import { TrackTypeButtonControlProps } from './types';

const TrackTypeButtonControl: FC<TrackTypeButtonControlProps> = observer(
    ({ track }) => {
        const options = useTrackTypeOption();
        const selected = { value: 'audio', title: 'audio' }; // ToDo: Hardcode с умыслом, что добавится midi тип

        const onChangeType = action((option: SelectorOption): void => {
            track.type = option.value;
        });

        return (
            <ButtonSelector
                disabled
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
