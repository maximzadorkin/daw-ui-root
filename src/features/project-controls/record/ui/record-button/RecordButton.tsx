/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TemplateIcon } from '@quarx-ui/icons/template/24px/fill/rounded';
import { projectStore } from '@entities/project';
import { mapRecordStateToType } from './maps';

const RecordButton: FC = observer(() => {
    const recording = String(projectStore.isRecording) as 'false' | 'true';

    const onClickHandler = (): void => {
        if (!projectStore.isRecording) {
            projectStore.record();
            return;
        }

        projectStore.stopRecord();
    };

    return (
        <IconButton
            color="danger"
            size="small"
            onClick={onClickHandler}
            disabled={projectStore.isPlaying}
            type={mapRecordStateToType[recording]}
        >
            <TemplateIcon />
        </IconButton>
    );
});

export { RecordButton };
