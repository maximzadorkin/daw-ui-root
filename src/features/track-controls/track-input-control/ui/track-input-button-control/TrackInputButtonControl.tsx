/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import {
    ButtonSelector,
    SelectorOption,
} from '@shared/components/button-selector';
import { useTrackInputOptions } from './helpers';
import { TrackInputButtonControlProps } from './types';

const TrackInputButtonControlComponent: FC<TrackInputButtonControlProps> = ({
    track,
}) => {
    const options = useTrackInputOptions(track);
    const selected = options.find(
        ({ value }) => track.input?.deviceId === value,
    );

    const onChangeInput = action((input: SelectorOption): void => {
        track.input = track.mediaDevices.audioInputs.find(
            ({ deviceId }) => deviceId === input.value,
        );
    });

    return (
        <ButtonSelector
            selectedPrefix="Ввод: "
            selected={selected}
            options={options}
            onChange={onChangeInput}
            loading={!track.mediaDevices.initialized}
        />
    );
};

export const TrackInputButtonControl = observer(
    TrackInputButtonControlComponent,
);
