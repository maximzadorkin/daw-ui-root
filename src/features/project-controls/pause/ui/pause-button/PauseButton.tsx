/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TwoVercticalRectanglesIcon } from '@quarx-ui/icons/two-verctical-rectangles/24px/fill/rounded';
import { useProject } from '@shared/stores';

const PauseButton: FC = observer(() => {
    const project = useProject();

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            disabled={!project.isPlaying || project.isRecording}
            onClick={project.pause}
        >
            <TwoVercticalRectanglesIcon />
        </IconButton>
    );
});

export { PauseButton };
