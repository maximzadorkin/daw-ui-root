/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ReactSlider from 'react-slider';
import { Project } from '@shared/lib/audio-context';
import { useProject } from '@shared/stores';
import { useStyles } from './style';

const MULTIPLIER = 100;

const ProjectVolumeRange: FC = observer(() => {
    const styles = useStyles();
    const project = useProject();

    const onChangeVolume = action((value: number) => {
        project.userVolume = value / MULTIPLIER;
    });

    return (
        <ReactSlider
            className={css(styles.slider)}
            thumbClassName={css(styles.thumb)}
            trackClassName={css(styles.track)}
            min={Project.MIN_USER_VOLUME * MULTIPLIER}
            max={Project.MAX_USER_VOLUME * MULTIPLIER}
            defaultValue={project.userVolume * MULTIPLIER}
            value={project.userVolume * MULTIPLIER}
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
