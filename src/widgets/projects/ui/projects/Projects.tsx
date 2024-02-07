/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OpenProjectButton } from '@features/open-project';
import React, { FC } from 'react';
import {
    Page,
    PageBody,
    PageCenter,
    PageFooter,
    PageHeader,
} from '@shared/ui/pages';
import { ReloadProjectsButton } from '@features/reload-projects';
import { Banner } from '@shared/ui/banners/banner';
import { ProjectWidgetState, useWidgetState } from './useWidgetState';
import { Loader } from '@quarx-ui/core';
import type { ProjectsProps } from './types';
import { ProjectType } from '@entities/project/model/enums';
import { projectsStore } from '@entities/project/model/projectsStore';
import { ProjectCard } from '@entities/project';
import { useStyles } from './style';
import { mapTypeToTitle } from './maps';
import { observer } from 'mobx-react';

const Projects: FC<ProjectsProps> = observer(
    ({ type = ProjectType.all, actions, projectActions = [] }) => {
        const widgetState = useWidgetState({ type });
        const styles = useStyles();

        return (
            <Page>
                <PageHeader title={mapTypeToTitle[type]} actions={actions} />
                <PageBody>
                    <div css={styles.root}>
                        {widgetState.state === ProjectWidgetState.notFound && (
                            <PageCenter>
                                <Banner title="Не найдено ни одного проекта" />
                            </PageCenter>
                        )}
                        {widgetState.state === ProjectWidgetState.loading && (
                            <PageCenter>
                                <div css={styles.loader}>
                                    <Loader />
                                </div>
                            </PageCenter>
                        )}
                        {widgetState.state === ProjectWidgetState.error && (
                            <PageCenter>
                                <Banner
                                    title="Что-то пошло не так"
                                    description={widgetState.error}
                                />
                            </PageCenter>
                        )}
                        {widgetState.state === ProjectWidgetState.viewer &&
                            projectsStore.projects?.map((project) => (
                                <ProjectCard
                                    name={project.name}
                                    owner={project.owner}
                                    actions={[
                                        <OpenProjectButton
                                            key={project.id}
                                            project={project}
                                        />,
                                        ...projectActions.map((Action) => (
                                            <Action
                                                key={project.id}
                                                {...project}
                                            />
                                        )),
                                    ]}
                                />
                            ))}
                    </div>
                </PageBody>
                <PageFooter>
                    <div css={styles.reload}>
                        <ReloadProjectsButton />
                    </div>
                </PageFooter>
            </Page>
        );
    },
);

export { Projects };
