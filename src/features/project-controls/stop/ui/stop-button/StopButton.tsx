/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { SquareIcon } from '@quarx-ui/icons/square/24px/fill/rounded';
import { projectStore } from '@entities/project';

const StopButton: FC = observer(() => (
    <IconButton
        color="secondary"
        type="text"
        size="small"
        disabled={!projectStore.isPlaying || projectStore.isRecording}
        onClick={projectStore.stop}
    >
        <SquareIcon />
    </IconButton>
));

export { StopButton };
