/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import {
    ButtonSelector,
    SelectorOption,
} from '@shared/components/button-selector';
import { useProjectViewModel } from '@shared/stores';
import { useTrackInputOptions } from './helpers';
import { TrackInputButtonControlProps } from './types';

// ToDo: Когда добавлю MediaDevices
const TrackInputButtonControlComponent: FC<TrackInputButtonControlProps> = ({
    track,
}) => {
    const store = useProjectViewModel();
    const options = useTrackInputOptions();
    const selected = options.find(
        ({ value }) => track.input?.deviceId === value,
    );

    const onChangeInput = action((input: SelectorOption): void => {
        track.input = store.mediaDevices.audioInputs.find(
            ({ deviceId }) => deviceId === input.value,
        );
    });

    return (
        <ButtonSelector
            selectedPrefix="Ввод: "
            selected={selected}
            options={options}
            onChange={onChangeInput}
        />
    );
};

export const TrackInputButtonControl = observer(
    TrackInputButtonControlComponent,
);
