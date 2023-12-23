/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import type { SidePanelProps } from './types';
import DawLabel from '@shared/icons/daw.svg';
import { useStyles } from './style';
import { ChangeThemeSwitch } from '@features/change-theme-switcher';
import { SignOutButton } from '@features/sign-out';
import { DropdownItem, IconButton } from '@quarx-ui/core';
import { PersonalBlock, userStore } from '@entities/user';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import { PAGES } from './pages.register';
import { ReloadCurrentUserButton } from '@features/reload-current-user';
import { observer } from 'mobx-react';

const SidePanel: FC<SidePanelProps> = observer(() => {
    const styles = useStyles();
    const [activePage, setActivePage] = useState<string | null>(null);
    const pages = useMemo(
        () => PAGES.map((page) => ({ id: v4(), ...page })),
        [],
    );

    const createOnChangePageHandler = (id: string) => (): void => {
        setActivePage(id);
    };

    useEffect(() => {
        userStore.getMe().finally();
    }, []);

    return (
        <div css={styles.root}>
            <div css={styles.header}>
                <DawLabel css={styles.label} />
            </div>
            <div css={styles.personal}>
                <PersonalBlock
                    user={userStore.currentUser}
                    loading={userStore.loadingCurrentUser}
                    reload={<ReloadCurrentUserButton />}
                    actions={[<SignOutButton key={v4()} />]}
                />
            </div>
            <div css={styles.body}>
                <div css={styles.pages}>
                    {pages.map((page) => (
                        <Link
                            key={page.id}
                            to={page.path}
                            css={styles.link}
                            tabIndex={-1}
                        >
                            <DropdownItem
                                size="medium"
                                color="secondary"
                                title={page.text}
                                description={page?.description}
                                state={activePage === page.id}
                                onChange={createOnChangePageHandler(page.id)}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div css={styles.footer}>
                <ChangeThemeSwitch />
            </div>
        </div>
    );
});

export { SidePanel };