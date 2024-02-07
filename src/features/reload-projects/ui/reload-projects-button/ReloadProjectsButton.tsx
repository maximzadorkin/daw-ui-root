import React, { FC } from 'react';
import { Button } from '@quarx-ui/core';
import { projectsStore } from '@entities/project/model/projectsStore';
import { observer } from 'mobx-react';
import { ArrowClockwiseForwardIcon } from '@quarx-ui/icons/arrow-clockwise-forward/24px/stroke/square';

const ReloadProjectsButton: FC = observer(() => {
    return (
        <Button
            color="secondary"
            size="small"
            leftIcon={<ArrowClockwiseForwardIcon />}
            loading={projectsStore.loading}
            disabled={projectsStore.loading}
            onClick={projectsStore.refetch}
        >
            Обновить
        </Button>
    );
});

export { ReloadProjectsButton };
