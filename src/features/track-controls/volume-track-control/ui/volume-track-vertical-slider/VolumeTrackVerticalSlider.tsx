/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { TrackStore } from '@shared/stores';
import { VolumeTrackVerticalSliderProps } from './types';
import { useStyles } from './style';

const VolumeTrackVerticalSlider: FC<VolumeTrackVerticalSliderProps> = observer(
    ({ track }) => {
        const styles = useStyles();

        const onSetVolume = action((value: number): void => {
            track.volume = value;
        });

        return (
            <ReactSlider
                className={css(styles.slider)}
                thumbClassName={css(styles.thumb)}
                trackClassName={css(styles.track)}
                min={TrackStore.MIN_VOLUME}
                max={TrackStore.MAX_VOLUME}
                defaultValue={track.volume}
                value={track.volume}
                onChange={onSetVolume}
                orientation="vertical"
                invert
                renderThumb={(props, state) => (
                    <div {...props} css={styles.thumbValue}>
                        {state.valueNow}
                    </div>
                )}
            />
        );
    },
);

export { VolumeTrackVerticalSlider };
