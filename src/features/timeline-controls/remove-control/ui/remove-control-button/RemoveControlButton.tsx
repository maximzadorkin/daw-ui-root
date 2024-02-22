import React, { FC } from 'react';
import { action } from 'mobx';
import { Vector2 } from 'three';
import { observer } from 'mobx-react';
import { Button } from '@shared/components/three/button';
import { useProjectControls, ProjectTimelineControls } from '@shared/stores';
import { mapStateToColor } from './maps';
import { RemoveControlButtonProps } from './types';

const RemoveControlButton: FC<RemoveControlButtonProps> = observer(
    ({ position, size }) => {
        const controls = useProjectControls();
        const isRemoveControl =
            controls.timelineControl === ProjectTimelineControls.remove;

        const onClickHandler = action((): void => {
            controls.timelineControl = ProjectTimelineControls.remove;
        });

        return (
            <Button
                color={mapStateToColor[String(isRemoveControl)]}
                size={new Vector2(size[0], size[1])}
                TextProps={{ fontSize: size[1] / 2 }}
                position={position}
                onClick={onClickHandler}
            >
                R
            </Button>
        );
    },
);

export { RemoveControlButton };
