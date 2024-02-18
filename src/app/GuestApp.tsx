/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';
import { NotFound } from '@shared/ui/banners/not-found';
import { PageCenter } from '@shared/ui/pages';
import { Auth } from '@pages/auth';
import { SignUpForm } from '@pages/sign-up';
import { Wrappers } from './Wrappers';
import { useStyles } from './style';

const GuestApp: FC = () => {
    const styles = useStyles({ params: { viewSidePage: false } });

    return (
        <Wrappers>
            <div css={styles.wrapper}>
                <div css={styles.page}>
                    <Routes>
                        <Route
                            path={PAGES_PATHS.signUp}
                            element={<SignUpForm />}
                        />
                        <Route path={PAGES_PATHS.signIn} element={<Auth />} />
                        <Route path={PAGES_PATHS.index} element={<Auth />} />
                        <Route
                            path={PAGES_PATHS.notFound}
                            element={
                                <PageCenter>
                                    <NotFound />
                                </PageCenter>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Wrappers>
    );
};

export { GuestApp };
