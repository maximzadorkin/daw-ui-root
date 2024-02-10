/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { TrackStore } from '@shared/stores';
import { PanTrackSliderProps } from './types';
import { useStyles } from './style';

const mult = 100;
const convertToStorePan = (value: number): number => value / mult;
const convertToViewPan = (value: number): number => value * mult;

const PanTrackSlider: FC<PanTrackSliderProps> = observer(({ track }) => {
    const styles = useStyles();
    const viewPan = convertToViewPan(track.pan);

    const onSetPan = action((value: number): void => {
        track.pan = convertToStorePan(value);
    });

    return (
        <ReactSlider
            className={css(styles.slider)}
            thumbClassName={css(styles.thumb)}
            trackClassName={css(styles.track)}
            min={convertToViewPan(TrackStore.MAX_LEFT_PAN)}
            max={convertToViewPan(TrackStore.MAX_RIGHT_PAN)}
            defaultValue={viewPan}
            value={viewPan}
            onChange={onSetPan}
            renderThumb={(props, state) => (
                <div {...props} css={styles.thumbValue}>
                    {state.valueNow}
                </div>
            )}
        />
    );
});

export { PanTrackSlider };
