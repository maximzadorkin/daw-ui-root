/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TriangleIcon } from '@quarx-ui/icons/triangle/24px/fill/rounded';
import { projectStore } from '@entities/project';

const PlayButton: FC = observer(() => (
    <IconButton
        color="secondary"
        type="text"
        size="small"
        disabled={projectStore.isPlaying || projectStore.isRecording}
        onClick={projectStore.play}
    >
        <TriangleIcon />
    </IconButton>
));

export { PlayButton };
