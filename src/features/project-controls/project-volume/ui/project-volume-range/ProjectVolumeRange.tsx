/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import ReactSlider from 'react-slider';
import { ProjectStore } from '@shared/stores';
import { useProjectStore } from '@shared/stores';
import { useStyles } from './style';

const ProjectVolumeRange: FC = observer(() => {
    const styles = useStyles();
    const store = useProjectStore();

    return (
        <ReactSlider
            className={css(styles.slider)}
            thumbClassName={css(styles.thumb)}
            trackClassName={css(styles.track)}
            min={ProjectStore.MIN_VOLUME}
            max={ProjectStore.MAX_VOLUME}
            defaultValue={store.currentVolume}
            value={store.currentVolume}
            onChange={store.setVolume}
            renderThumb={(props, state) => (
                <div {...props} css={styles.thumbValue}>
                    {state.valueNow}
                </div>
            )}
        />
    );
});

export { ProjectVolumeRange };
