import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authStore } from '@shared/stores/auth';
import { observer } from 'mobx-react';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';

// ToDo: Enable when ac
const ProtectedRoute: FC<{ children: ReactNode }> = observer(({ children }) => {
    // if (!authStore.isAuth) {
    //     return <Navigate to={PAGES_PATHS.signIn} />;
    // }

    return children;
});

export { ProtectedRoute };
