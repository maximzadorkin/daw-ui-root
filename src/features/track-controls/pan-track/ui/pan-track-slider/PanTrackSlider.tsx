/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import { TrackViewModel } from '@shared/stores';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { PanTrackSliderProps } from './types';
import { useStyles } from './style';

const PanTrackSlider: FC<PanTrackSliderProps> = observer(({ track }) => {
    const styles = useStyles();

    const onSetPan = action((value: number): void => {
        track.pan = value;
    });

    return (
        <ReactSlider
            className={css(styles.slider)}
            thumbClassName={css(styles.thumb)}
            trackClassName={css(styles.track)}
            min={TrackViewModel.LIMIT_LEFT_PAN}
            max={TrackViewModel.LIMIT_RIGHT_PAN}
            defaultValue={track.pan}
            value={track.pan}
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
