import { ReactNode } from 'react';
import { User } from '@shared/api/modules/users/types';

interface ProjectCardProps {
    name?: ReactNode;

    owner?: User;

    actions?: ReactNode[];
}

export type { ProjectCardProps };
