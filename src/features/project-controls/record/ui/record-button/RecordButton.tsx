/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TemplateIcon } from '@quarx-ui/icons/template/24px/fill/rounded';
import { useProjectViewModel } from '@shared/stores';
import { mapRecordStateToType } from './maps';

const RecordButton: FC = observer(() => {
    const store = useProjectViewModel();
    // ToDo: const recording = String(store.isRecording) as 'false' | 'true';
    const recording = String(false) as 'false' | 'true';

    const onClickHandler = (): void => {
        //  ToDo: Когда добавится isRecording
        // if (!store.isRecording) {
        //     store.record();
        //     return;
        // }
        //
        // store.stopRecord();
    };

    return (
        <IconButton
            color="danger"
            size="small"
            onClick={onClickHandler}
            disabled={store.isPlaying}
            type={mapRecordStateToType[recording]}
        >
            <TemplateIcon />
        </IconButton>
    );
});

export { RecordButton };
