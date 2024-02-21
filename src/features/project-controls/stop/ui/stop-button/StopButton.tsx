/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { SquareIcon } from '@quarx-ui/icons/square/24px/fill/rounded';
import { useProject } from '@shared/stores';

const StopButton: FC = observer(() => {
    const project = useProject();

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            disabled={project.isRecording}
            onClick={project.stop}
        >
            <SquareIcon />
        </IconButton>
    );
});

export { StopButton };
