/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import {
    ButtonSelector,
    SelectorOption,
} from '@shared/components/button-selector';
import { useTrackInputOptions } from './helpers';
import { TrackInputButtonControlProps } from './types';

const TrackInputButtonControl: FC<TrackInputButtonControlProps> = observer(
    ({ track }) => {
        const options = useTrackInputOptions();
        const selected = options.find(({ value }) => value === track.input);

        const onChangeInput = (input: SelectorOption): void => {
            track.input = input.value;
        };

        return (
            <ButtonSelector
                selectedPrefix="Ввод: "
                selected={selected}
                options={options}
                onChange={onChangeInput}
            />
        );
    },
);

export { TrackInputButtonControl };
