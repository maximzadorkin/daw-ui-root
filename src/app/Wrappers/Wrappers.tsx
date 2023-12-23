import React from 'react';
import { FC, ReactNode } from 'react';
import { Theme } from './Theme';
import { Container } from './Container';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { Notifications } from '@processes/Notifications';
import { Router } from './Router';

const Wrappers: FC<{ children: ReactNode }> = ({ children }) => (
    <ErrorBoundary>
        <Theme>
            <Container>
                <Notifications>
                    <Router>{children}</Router>
                </Notifications>
            </Container>
        </Theme>
    </ErrorBoundary>
);

export { Wrappers };
