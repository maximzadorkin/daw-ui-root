/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { CrossIcon } from '@quarx-ui/icons/cross/16px/stroke/rounded/CrossIcon';
import { IconButton } from '@quarx-ui/core';
import { useProjectViewModel } from '@shared/stores';
import { RemoveTrackButtonProps } from './types';

const RemoveTrackButton: FC<RemoveTrackButtonProps> = observer(({ track }) => {
    const store = useProjectViewModel();

    const onClickHandler = (): void => {
        store.removeTrack(track.id);
    };

    return (
        <IconButton
            size="xSmall"
            type="text"
            color="danger"
            onClick={onClickHandler}
            disabled={store.isPlaying}
            css={{ alignSelf: 'flex-end' }}
        >
            <CrossIcon />
        </IconButton>
    );
});

export { RemoveTrackButton };
