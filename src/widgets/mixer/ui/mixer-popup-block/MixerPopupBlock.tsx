/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useProject, useProjectControls } from '@shared/stores';
import { CloseMixerButton } from '@features/mixer/close-mixer';
import { MixerTrack } from '../mixer-track';
import { useStyles } from './style';

const MixerPopupBlock: FC = observer(() => {
    const store = useProject();
    const controls = useProjectControls();
    const styles = useStyles({ params: { tracksCount: store.tracks.length } });

    if (!controls.viewMixer) {
        return null;
    }

    return (
        <div css={styles.root}>
            <div css={styles.header}>
                <CloseMixerButton css={styles.closeButton} />
            </div>
            <div css={styles.body}>
                {store.tracks.map((track) => (
                    <div css={styles.track} key={track.id}>
                        <MixerTrack track={track} />
                    </div>
                ))}
            </div>
        </div>
    );
});

export { MixerPopupBlock };
