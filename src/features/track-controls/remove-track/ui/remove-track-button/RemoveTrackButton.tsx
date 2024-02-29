/** @jsx jsx */
import { jsx } from '@emotion/react';
import { projectClient } from '@shared/api/modules/project/client';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { CrossIcon } from '@quarx-ui/icons/cross/16px/stroke/rounded/CrossIcon';
import { IconButton } from '@quarx-ui/core';
import { useProject } from '@shared/contexts/project-context';
import { RemoveTrackButtonProps } from './types';

const RemoveTrackButton: FC<RemoveTrackButtonProps> = observer(({ track }) => {
    const project = useProject();

    const onClickHandler = (): void => {
        project.removeTrack(track.id);
    };

    return (
        <IconButton
            size="xSmall"
            type="text"
            color="danger"
            onClick={onClickHandler}
            disabled={project.isPlaying}
            css={{ alignSelf: 'flex-end' }}
        >
            <CrossIcon />
        </IconButton>
    );
});

export { RemoveTrackButton };
