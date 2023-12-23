/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { FC } from 'react';
import { observer } from 'mobx-react';
import '@shared/styles/reset.sass';
import { Wrappers } from '@app/Wrappers';
import { SidePanel } from '@processes/SidePanel';
import { Pages } from '@pages';
import { useStyles } from './style';
import { authStore } from '@shared/stores/auth';

const App: FC = observer(() => {
    const styles = useStyles({ params: { viewSidePage: authStore.isAuth } });
    return (
        <Wrappers>
            <div css={styles.wrapper}>
                {authStore.isAuth && <SidePanel />}
                <div css={styles.page}>
                    <Pages />
                </div>
            </div>
        </Wrappers>
    );
});

export { App };
