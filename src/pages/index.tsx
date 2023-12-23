import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Lamp } from '@shared/ui/Lamp';
import { NotFound } from '@shared/ui/banners/not-found';
import { PageCenter } from '@shared/ui/pages';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';
import { AllProjects } from '@pages/all-projects';
import { SignUpForm } from '@pages/sign-up';
import { Auth } from '@pages/auth';
import { authStore } from '@shared/stores/auth';
import { OwnProjects } from '@pages/own-projects/ui/own-projects';
import { OthersProjects } from '@pages/other-projects/ui/other-projects';
import { observer } from 'mobx-react';
import { ProtectedRoute } from '@shared/ui/ProtectedRoute';

const Pages = observer(() => (
    <Routes>
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
        {!authStore.isAuth && (
            <Route path={PAGES_PATHS.signIn} element={<Auth />} />
        )}
        {!authStore.isAuth && (
            <Route path={PAGES_PATHS.signUp} element={<SignUpForm />} />
        )}
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
