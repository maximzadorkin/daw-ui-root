/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { TrackStore } from '@shared/stores';
import { VolumeVerticalIndicatorProps } from './types';
import { useStyles } from './style';

const VolumeVerticalIndicator: FC<VolumeVerticalIndicatorProps> = observer(
    ({ track }) => {
        const styles = useStyles();

        return (
            <ReactSlider
                className={css(styles.slider)}
                trackClassName={css(styles.track)}
                thumbClassName={css(styles.thumb)}
                min={TrackStore.MIN_VOLUME}
                max={TrackStore.MAX_VOLUME}
                defaultValue={TrackStore.MIN_VOLUME}
                value={track.playedVolume}
                orientation="vertical"
                invert
                disabled
                renderThumb={(props) => <div {...props} />}
            />
        );
    },
);

export { VolumeVerticalIndicator };
