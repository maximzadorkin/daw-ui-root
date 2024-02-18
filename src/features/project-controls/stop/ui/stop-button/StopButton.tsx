/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { SquareIcon } from '@quarx-ui/icons/square/24px/fill/rounded';
import { useProjectViewModel } from '@shared/stores';

const StopButton: FC = observer(() => {
    const store = useProjectViewModel();

    return (
        <IconButton
            color="secondary"
            type="text"
            size="small"
            // disabled={store.isRecording} // ToDo: store.isRecording
            onClick={store.stop}
        >
            <SquareIcon />
        </IconButton>
    );
});

export { StopButton };
