import React, { FC } from 'react';
import { Projects } from '@widgets/projects';
import { ProjectType } from '@entities/project/model/enums';

const AllProjects: FC = () => {
    return <Projects type={ProjectType.all} />;
};

export { AllProjects };
