/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { ButtonType } from '@quarx-ui/core/src/main/Button/types';
import { IconButton } from '@quarx-ui/core';
import { MuteTrackButtonProps } from './types';

const mapStateToType: Record<string, ButtonType> = {
    false: 'text',
    true: 'contained',
};

const MuteTrackButton: FC<MuteTrackButtonProps> = observer(({ track }) => {
    const onClickHandler = action((): void => {
        track.mute = !track.mute;
    });

    return (
        <IconButton
            size="xSmall"
            color="warning"
            onClick={onClickHandler}
            type={mapStateToType[String(track.mute)]}
            css={{ alignSelf: 'flex-end' }}
        >
            M
        </IconButton>
    );
});

export { MuteTrackButton };
