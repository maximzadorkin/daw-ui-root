import React, { FC } from 'react';
import { Projects } from '@widgets/projects';
import { ProjectType } from '@entities/project/model/enums';
import { DeleteProjectButton } from '@features/delete-project';
import { CreateProjectButton } from '@features/create-project';

const OwnProjects: FC = () => {
    return (
        <Projects
            type={ProjectType.own}
            actions={[<CreateProjectButton />]}
            projectActions={[DeleteProjectButton]}
        />
    );
};

export { OwnProjects };
