import { ReactNode } from 'react';
import { User } from '@shared/api/modules/users/types';

interface PersonalBlockProps {
    user?: User | null;

    loading?: boolean;

    actions?: ReactNode[];

    reload?: ReactNode;
}

export type { PersonalBlockProps };
