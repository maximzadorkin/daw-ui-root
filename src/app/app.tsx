/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { observer } from 'mobx-react';
import '@shared/styles/reset.sass';
import { Wrappers } from '@app/Wrappers';
import { SidePanel } from '@processes/SidePanel';
import { Pages } from '@pages';
import { useStyles } from './style';
import { authStore } from '@shared/stores/auth';

const App: FC = observer(() => {
    // todo: и здесь и в sidepanel сделать нормальную проверку на видимость side panel
    // fixme: на данный момент без обновления страницы не сбрасывается параметр
    const viewSidePage =
        authStore.isAuth && !window.location.pathname.startsWith('/project/');

    const styles = useStyles({
        params: { viewSidePage },
    });

    return (
        <Wrappers>
            <div css={styles.wrapper}>
                <SidePanel />
                <div css={styles.page}>
                    <Pages />
                </div>
            </div>
        </Wrappers>
    );
});

export { App };
