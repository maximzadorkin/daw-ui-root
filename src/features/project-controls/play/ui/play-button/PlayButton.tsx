/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { useProjectViewModel } from '@shared/stores';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TriangleIcon } from '@quarx-ui/icons/triangle/24px/fill/rounded';

const PlayButton: FC = observer(() => {
    const store = useProjectViewModel();

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            disabled={store.isPlaying} // ToDo: add || store.isRecording
            onClick={store.play}
        >
            <TriangleIcon />
        </IconButton>
    );
});

export { PlayButton };
