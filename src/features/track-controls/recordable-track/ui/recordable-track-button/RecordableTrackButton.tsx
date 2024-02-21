import { ButtonType } from '@quarx-ui/core/src/main/Button/types';
import { useProjectControls } from '@shared/stores';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TemplateIcon } from '@quarx-ui/icons/template/16px/fill/rounded';
import { mapStateToColor, mapStateToType } from './maps';
import { RecordableTrackButtonProps } from './types';

const RecordableTrackButton: FC<RecordableTrackButtonProps> = observer(
    ({ track }) => {
        const controls = useProjectControls();
        const isRecordable = controls.isRecordableTrack(track.id);

        const buttonViewType =
            mapStateToType[String(track?.record?.isRecording && isRecordable)];

        const onClickHandler = action((): void => {
            if (isRecordable) {
                controls.removeTrackFromRecordable(track.id);
            } else {
                controls.addTrackToRecordable(track);
            }
        });

        return (
            <IconButton
                size="xSmall"
                type={buttonViewType}
                color={mapStateToColor[String(isRecordable)]}
                onClick={onClickHandler}
                disabled={track.record?.isRecording || !track.input}
                css={{ alignSelf: 'flex-end', padding: 8 }}
            >
                <TemplateIcon />
            </IconButton>
        );
    },
);

export { RecordableTrackButton };
