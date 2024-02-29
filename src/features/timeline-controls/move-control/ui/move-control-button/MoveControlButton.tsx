import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Vector2 } from 'three';
import {
    ProjectTimelineControls,
    useProjectControls,
} from '@shared/contexts/project-controls-context';
import { Button } from '@shared/components/three/button';
import { mapStateToColor } from './maps';
import { MoveControlButtonProps } from './types';

const MoveControlButton: FC<MoveControlButtonProps> = observer(
    ({ position, size }) => {
        const controls = useProjectControls();
        const isMoveControl =
            controls.timelineControl === ProjectTimelineControls.move;

        const onClickHandler = action((): void => {
            controls.timelineControl = ProjectTimelineControls.move;
        });

        return (
            <Button
                color={mapStateToColor[String(isMoveControl)]}
                size={new Vector2(size[0], size[1])}
                TextProps={{ fontSize: size[1] / 2 }}
                position={position}
                onClick={onClickHandler}
            >
                M
            </Button>
        );
    },
);

export { MoveControlButton };
