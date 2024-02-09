/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TemplateIcon } from '@quarx-ui/icons/template/24px/fill/rounded';
import { useProjectStore } from '@shared/stores';
import { mapRecordStateToType } from './maps';

const RecordButton: FC = observer(() => {
    const store = useProjectStore();
    const recording = String(store.isRecording) as 'false' | 'true';

    const onClickHandler = (): void => {
        if (!store.isRecording) {
            store.record();
            return;
        }

        store.stopRecord();
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
