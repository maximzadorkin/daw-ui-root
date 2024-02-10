/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Divider } from '@quarx-ui/core';
import { PanTrackSlider } from '@features/track-controls/pan-track';
import { MuteTrackButton } from '@features/track-controls/mute-track';
import { AddTrackFxButton } from '@features/track-controls/add-track-fx';
import { RemoveTrackButton } from '@features/track-controls/remove-track';
import { TrackFxButtonControl } from '@features/track-controls/track-fx-control';
import { TrackTypeButtonControl } from '@features/track-controls/track-type-control';
import { TrackInputButtonControl } from '@features/track-controls/track-input-control';
import { VolumeTrackVerticalSlider } from '@features/track-controls/volume-track-control';
import { VolumeVerticalIndicator } from '@entities/volume/ui/volume-vertical-indicator';
import { MixerTrackProps } from './types';
import { useStyles } from './style';

const MixerTrack: FC<MixerTrackProps> = observer(({ track }) => {
    const styles = useStyles();

    return (
        <div css={styles.root}>
            {/* todo: add ellipsis */}
            <div css={styles.block}>
                <div css={styles.title}>{track.name}</div>
            </div>
            <Divider />
            <div css={styles.block}>
                <div css={styles.vertical}>
                    <TrackTypeButtonControl track={track} />
                    <TrackInputButtonControl track={track} />
                    <PanTrackSlider track={track} />
                </div>
            </div>
            <Divider />
            <div css={styles.block}>
                <div css={styles.indicators}>
                    <div css={styles.horizontal}>
                        <VolumeTrackVerticalSlider track={track} />
                        <VolumeVerticalIndicator track={track} />
                    </div>
                    <div css={styles.vertical}>
                        <MuteTrackButton track={track} />
                        <RemoveTrackButton track={track} />
                    </div>
                </div>
            </div>
            <Divider />
            <div css={styles.block}>
                <div css={styles.vertical}>
                    <div css={styles.fxHeader}>
                        <div css={styles.fxTitle}>Эффекты</div>
                    </div>
                    {track.fxs.map((fx) => (
                        <TrackFxButtonControl track={track} fx={fx} />
                    ))}
                    <AddTrackFxButton />
                </div>
            </div>
        </div>
    );
});

export { MixerTrack };
