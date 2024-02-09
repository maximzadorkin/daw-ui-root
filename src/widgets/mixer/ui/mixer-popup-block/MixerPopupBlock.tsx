/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { IconButton } from '@quarx-ui/core';
import { CrossIcon } from '@quarx-ui/icons/cross/24px/stroke/square';
import { useProjectStore } from '@shared/stores';
import { MixerTrack } from '@entities/track';
import { useStyles } from './style';

const MixerPopupBlock: FC = observer(() => {
    const styles = useStyles();
    const store = useProjectStore();

    const onClose = action((): void => {
        store.viewMixer = false;
    });

    if (!store.viewMixer) {
        return;
    }

    return (
        <div css={styles.root}>
            <div css={styles.header}>
                <IconButton
                    type="text"
                    size="small"
                    color="secondary"
                    onClick={onClose}
                    css={styles.closeButton}
                >
                    <CrossIcon />
                </IconButton>
            </div>
            <div css={styles.body}>
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
                <MixerTrack />
            </div>
        </div>
    );
});

export { MixerPopupBlock };
