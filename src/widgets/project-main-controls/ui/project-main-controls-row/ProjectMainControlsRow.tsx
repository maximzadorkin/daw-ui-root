/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import type { FC } from 'react';
import { ProjectVolumeRange } from '@features/project-controls/project-volume';
import { OpenMixerButton } from '@features/project-controls/open-mixer';
import { AddTrackButton } from '@features/project-controls/add-track';
import { RecordButton } from '@features/project-controls/record';
import { PauseButton } from '@features/project-controls/pause';
import { StopButton } from '@features/project-controls/stop';
import { PlayButton } from '@features/project-controls/play';
import { useStyles } from './style';

const ProjectMainControlsRow: FC = () => {
    const styles = useStyles();

    return (
        <div css={styles.root}>
            <div css={styles.left}>
                <OpenMixerButton />
                <AddTrackButton />
            </div>
            <div css={styles.center}>
                <PlayButton />
                <PauseButton />
                <StopButton />
                <RecordButton />
            </div>
            <div css={styles.right}>
                <ProjectVolumeRange />
            </div>
        </div>
    );
};

export { ProjectMainControlsRow };
