/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { IconButton } from '@quarx-ui/core';
import { DotsHorizontalIcon } from '@quarx-ui/icons/dots-horizontal/24px/stroke/rounded';

const AddTrackFxButton: FC = () => {
    return (
        <IconButton
            size="xSmall"
            type="outlined"
            color="secondary"
            css={{ width: '100%' }}
        >
            <DotsHorizontalIcon />
        </IconButton>
    );
};

export { AddTrackFxButton };
