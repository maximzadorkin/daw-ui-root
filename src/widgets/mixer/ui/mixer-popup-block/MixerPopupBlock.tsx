/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useProjectViewModel } from '@shared/stores';
import { CloseMixerButton } from '@features/mixer/close-mixer';
import { MixerTrack } from '../mixer-track';
import { useStyles } from './style';

const MixerPopupBlock: FC = observer(() => {
    const store = useProjectViewModel();
    const styles = useStyles({ params: { tracksCount: store.tracks.length } });

    if (!store.viewMixer) {
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
