/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { observer } from 'mobx-react';
import '@shared/styles/reset.sass';
import { Wrappers } from '@app/Wrappers';
import { SidePanel } from '@processes/SidePanel';
import { Pages } from '@pages';
import { useLocation } from 'react-router-dom';
import { useStyles } from './style';

const isProject = () => location.pathname.startsWith('/project/');

const UserApp: FC = observer(() => {
    // const location = useLocation();
    const [viewSidePage, setViewSidePage] = useState(!isProject());
    const href = useRef<string>(document.location.href);

    useEffect(() => {
        const bodyList = document.querySelector('body');

        if (!bodyList) {
            return;
        }

        const observer = new MutationObserver((mutations) => {
            if (href.current != document.location.href) {
                href.current = document.location.href;
                setViewSidePage(!isProject());
            }
        });

        observer.observe(bodyList, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, []);

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

export { UserApp };
