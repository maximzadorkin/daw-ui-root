/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { CrossIcon } from '@quarx-ui/icons/cross/16px/stroke/rounded/CrossIcon';
import { IconButton } from '@quarx-ui/core';
import { useProjectStore } from '@shared/stores';
import { RemoveTrackButtonProps } from './types';

const RemoveTrackButton: FC<RemoveTrackButtonProps> = observer(({ track }) => {
    const store = useProjectStore();

    const onClickHandler = (): void => {
        store.removeTrack(track);
    };

    return (
        <IconButton
            size="xSmall"
            type="text"
            color="danger"
            onClick={onClickHandler}
            css={{ alignSelf: 'flex-end' }}
        >
            <CrossIcon />
        </IconButton>
    );
});

export { RemoveTrackButton };
