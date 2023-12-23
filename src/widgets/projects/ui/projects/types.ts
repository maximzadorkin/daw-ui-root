import { ProjectType } from '@entities/project/model/enums';
import { FC, ReactNode } from 'react';
import { Project } from '@shared/api/modules/projects/types';

interface ProjectsProps {
    type: ProjectType;

    actions?: ReactNode[];

    projectActions?: FC<Project>[];
}

export type { ProjectsProps };
