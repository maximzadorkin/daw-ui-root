/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import ReactSlider from 'react-slider';
import { ProjectViewModel } from '@shared/stores';
import { useProjectViewModel } from '@shared/stores';
import { useStyles } from './style';

const MULTIPLIER = 100;

const ProjectVolumeRange: FC = observer(() => {
    const styles = useStyles();
    const store = useProjectViewModel();

    const onChangeVolume = action((value: number) => {
        store.userVolume = value / MULTIPLIER;
    });

    return (
        <ReactSlider
            className={css(styles.slider)}
            thumbClassName={css(styles.thumb)}
            trackClassName={css(styles.track)}
            min={ProjectViewModel.MIN_USER_VOLUME * MULTIPLIER}
            max={ProjectViewModel.MAX_USER_VOLUME * MULTIPLIER}
            defaultValue={store.userVolume * MULTIPLIER}
            value={store.userVolume * MULTIPLIER}
            onChange={onChangeVolume}
            renderThumb={(props, state) => (
                <div {...props} css={styles.thumbValue}>
                    {state.valueNow}
                </div>
            )}
        />
    );
});

export { ProjectVolumeRange };
