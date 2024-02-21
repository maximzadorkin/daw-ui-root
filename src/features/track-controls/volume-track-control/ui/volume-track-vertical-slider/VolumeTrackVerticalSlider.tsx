/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { Track } from '@shared/lib/audio-context';
import { VolumeTrackVerticalSliderProps } from './types';
import { useStyles } from './style';

const MULTIPLIER = 100;
const VolumeTrackVerticalSlider: FC<VolumeTrackVerticalSliderProps> = observer(
    ({ track }) => {
        const styles = useStyles();

        const onSetVolume = action((value: number): void => {
            track.volume = value / MULTIPLIER;
        });

        return (
            <ReactSlider
                className={css(styles.slider)}
                thumbClassName={css(styles.thumb)}
                trackClassName={css(styles.track)}
                min={Track.MIN_VOLUME * MULTIPLIER}
                max={Track.MAX_VOLUME * MULTIPLIER}
                defaultValue={track.volume * MULTIPLIER}
                value={track.volume * MULTIPLIER}
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
