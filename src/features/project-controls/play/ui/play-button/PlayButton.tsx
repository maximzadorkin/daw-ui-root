/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { useProject } from '@shared/stores';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TriangleIcon } from '@quarx-ui/icons/triangle/24px/fill/rounded';

const PlayButton: FC = observer(() => {
    const project = useProject();

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            disabled={project.isPlaying || project.isRecording}
            onClick={project.play}
        >
            <TriangleIcon />
        </IconButton>
    );
});

export { PlayButton };
