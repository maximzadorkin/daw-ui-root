import { Page, PageHeader } from '@shared/ui/pages';
import React from 'react';
import { useProjectId } from '@entities/project';

const Project = () => {
    const id = useProjectId();
    return <Page></Page>;
};

export { Project };
