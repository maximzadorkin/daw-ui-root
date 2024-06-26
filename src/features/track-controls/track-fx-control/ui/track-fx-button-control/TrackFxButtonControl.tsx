/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { CrossIcon } from '@quarx-ui/icons/cross/16px/stroke/rounded/CrossIcon';
import { Button } from '@quarx-ui/core';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { useProjectControls } from '@shared/contexts/project-controls-context';
import { useStyles } from './style';
import { TrackFxButtonControlProps } from './types';

const TrackFxButtonControl: FC<TrackFxButtonControlProps> = observer(
    ({ track, fx }) => {
        const styles = useStyles();
        const controls = useProjectControls();

        const onClickHandler = action(() => {
            controls.viewFx = fx;
        });

        const onRemoveClickHandler = (): void => {
            track.removeFx(fx);
        };

        return (
            <div css={styles.root}>
                <Button
                    size="xSmall"
                    type="outlined"
                    color="secondary"
                    css={styles.main}
                    onClick={onClickHandler}
                >
                    {fx.name}
                </Button>
                <Button
                    size="xSmall"
                    type="outlined"
                    color="danger"
                    css={styles.remove}
                    onClick={onRemoveClickHandler}
                >
                    <CrossIcon />
                </Button>
            </div>
        );
    },
);

export { TrackFxButtonControl };
