/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TemplateIcon } from '@quarx-ui/icons/template/24px/fill/rounded';
import { useProject, useProjectControls } from '@shared/stores';
import { mapRecordStateToType } from './maps';

const RecordButton: FC = observer(() => {
    const project = useProject();
    const controls = useProjectControls();

    const onClickHandler = (): void => {
        if (project.isRecording) {
            project.stopRecord();
            return;
        }

        project.startRecord(controls.recordableTracks);
    };

    return (
        <IconButton
            color="danger"
            size="small"
            onClick={onClickHandler}
            disabled={project.isPlaying && !project.isRecording}
            type={mapRecordStateToType[String(project.isRecording) ?? 'false']}
        >
            <TemplateIcon />
        </IconButton>
    );
});

export { RecordButton };
