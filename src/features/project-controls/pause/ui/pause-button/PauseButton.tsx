/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { TwoVercticalRectanglesIcon } from '@quarx-ui/icons/two-verctical-rectangles/24px/fill/rounded';
import { useProjectViewModel } from '@shared/stores';

const PauseButton: FC = observer(() => {
    const store = useProjectViewModel();

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            disabled={!store.isPlaying} // ToDo: add || store.isRecording
            onClick={store.pause}
        >
            <TwoVercticalRectanglesIcon />
        </IconButton>
    );
});

export { PauseButton };
