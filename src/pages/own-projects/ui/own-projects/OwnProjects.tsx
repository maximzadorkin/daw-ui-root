import React, { FC } from 'react';
import { Projects } from '@widgets/projects';
import { ProjectType } from '@entities/project/model/enums';
import { DeleteProjectButton } from '@features/delete-project';

const OwnProjects: FC = () => {
    return (
        <Projects
            type={ProjectType.own}
            projectActions={[DeleteProjectButton]}
        />
    );
};

export { OwnProjects };
