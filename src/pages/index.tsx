import React from 'react';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';
import { ProtectedRoute } from '@shared/ui/ProtectedRoute';
import { NotFound } from '@shared/ui/banners/not-found';
import { PageCenter } from '@shared/ui/pages';
import { Lamp } from '@shared/ui/Lamp';
import { AllProjects } from './all-projects';
import { OwnProjects } from './own-projects';
import { OthersProjects } from './other-projects';
import { Project } from './project';

const Pages = observer(() => (
    <Routes>
        <Route
            path={PAGES_PATHS.project}
            element={
                <ProtectedRoute>
                    <Project />
                </ProtectedRoute>
            }
        />
        <Route
            path={PAGES_PATHS.allProjects}
            element={
                <ProtectedRoute>
                    <AllProjects />
                </ProtectedRoute>
            }
        />
        <Route
            path={PAGES_PATHS.ownProjects}
            element={
                <ProtectedRoute>
                    <OwnProjects />
                </ProtectedRoute>
            }
        />
        <Route
            path={PAGES_PATHS.otherProjects}
            element={
                <ProtectedRoute>
                    <OthersProjects />
                </ProtectedRoute>
            }
        />
        <Route
            path={PAGES_PATHS.index}
            element={
                <ProtectedRoute>
                    <PageCenter>
                        <Lamp />
                    </PageCenter>
                </ProtectedRoute>
            }
        />
        <Route
            path={PAGES_PATHS.notFound}
            element={
                <PageCenter>
                    <NotFound />
                </PageCenter>
            }
        />
    </Routes>
));

export { Pages };
