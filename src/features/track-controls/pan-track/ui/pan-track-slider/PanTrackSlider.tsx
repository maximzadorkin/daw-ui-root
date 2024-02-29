/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { Track } from '@shared/lib/audio-api';
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
            min={Track.LIMIT_LEFT_PAN}
            max={Track.LIMIT_RIGHT_PAN}
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
