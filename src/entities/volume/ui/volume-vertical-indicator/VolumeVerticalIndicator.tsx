/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { TrackViewModel } from '@shared/stores';
import { VolumeVerticalIndicatorProps } from './types';
import { useStyles } from './style';

const VolumeVerticalIndicator: FC<VolumeVerticalIndicatorProps> = observer(
    ({ track }) => {
        const styles = useStyles();
        const interval = useRef<number>();
        const [currentVolume, setCurrentVolume] = useState<number>(
            TrackViewModel.MIN_CURRENT_VOLUME,
        );

        useEffect(() => {
            clearInterval(interval.current);
            if (track.isPlaying) {
                interval.current = setInterval(() => {
                    setCurrentVolume(track.computeCurrentVolume());
                }, 16);
            } else {
                setCurrentVolume(TrackViewModel.MIN_CURRENT_VOLUME);
            }

            return () => {
                clearInterval(interval.current);
            };
        }, [track.isPlaying]);

        return (
            <ReactSlider
                className={css(styles.slider)}
                trackClassName={css(styles.track)}
                thumbClassName={css(styles.thumb)}
                min={TrackViewModel.MIN_CURRENT_VOLUME}
                max={TrackViewModel.MAX_CURRENT_VOLUME}
                defaultValue={currentVolume}
                value={currentVolume}
                orientation="vertical"
                invert
                disabled
                renderThumb={(props) => <div {...props} />}
            />
        );
    },
);

export { VolumeVerticalIndicator };
