/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TwoVercticalRectanglesIcon } from '@quarx-ui/icons/two-verctical-rectangles/24px/fill/rounded';
import { projectStore } from '@entities/project';

const PauseButton: FC = observer(() => (
    <IconButton
        color="secondary"
        type="text"
        size="small"
        disabled={!projectStore.isPlaying || projectStore.isRecording}
        onClick={projectStore.pause}
    >
        <TwoVercticalRectanglesIcon />
    </IconButton>
));

export { PauseButton };
