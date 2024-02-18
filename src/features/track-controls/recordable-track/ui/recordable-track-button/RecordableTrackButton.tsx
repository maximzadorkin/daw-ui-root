import { ButtonType } from '@quarx-ui/core/src/main/Button/types';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { IconButton, PaletteColor } from '@quarx-ui/core';
import { TemplateIcon } from '@quarx-ui/icons/template/16px/fill/rounded';
import { useProjectViewModel } from '@shared/stores';
import { RecordableTrackButtonProps } from './types';

const mapStateToType: Record<string, ButtonType> = {
    false: 'text',
    true: 'contained',
};

const mapStateToColor: Record<string, PaletteColor> = {
    false: 'secondary',
    true: 'danger',
};

// ToDo: Добавить, когда будет работать запись recording
const RecordableTrackButton: FC<RecordableTrackButtonProps> = observer(
    ({ track }) => {
        const store = useProjectViewModel();
        const buttonViewType =
            mapStateToType[String(store.isRecording && track.recordable)];

        const onClickHandler = action((): void => {
            track.recordable = !track.recordable;
        });

        return (
            <IconButton
                size="xSmall"
                type={buttonViewType}
                color={mapStateToColor[String(track.recordable)]}
                onClick={onClickHandler}
                css={{ alignSelf: 'flex-end', padding: 8 }}
            >
                <TemplateIcon />
            </IconButton>
        );
    },
);

export { RecordableTrackButton };
