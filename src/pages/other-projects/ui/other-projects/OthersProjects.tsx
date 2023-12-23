import React, { FC } from 'react';
import { Projects } from '@widgets/projects';
import { ProjectType } from '@entities/project/model/enums';

const OthersProjects: FC = () => {
    return <Projects type={ProjectType.other} />;
};

export { OthersProjects };
