import React, { FC } from 'react';
import { Button } from '@quarx-ui/core';
import { projectStore } from '@entities/project/model/projectStore';
import { observer } from 'mobx-react';
import { ArrowClockwiseForwardIcon } from '@quarx-ui/icons/arrow-clockwise-forward/24px/stroke/square';

const ReloadProjectsButton: FC = observer(() => {
    return (
        <Button
            color="secondary"
            size="small"
            leftIcon={<ArrowClockwiseForwardIcon />}
            loading={projectStore.loading}
            disabled={projectStore.loading}
            onClick={projectStore.refetch}
        >
            Обновить
        </Button>
    );
});

export { ReloadProjectsButton };
