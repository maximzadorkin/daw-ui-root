/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { observer } from 'mobx-react';
import '@shared/styles/reset.sass';
import { authStore } from '@shared/stores/auth';
import { PageCenter } from '@shared/ui/pages';
import { Lamp } from '@shared/ui/Lamp';
import { userStore } from '@entities/user';
import { GuestApp } from './GuestApp';
import { UserApp } from './UserApp';

const App: FC = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     userStore
    //         .getMe()
    //         .catch(() => {
    //             authStore.reset();
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // }, []);
    //
    // if (isLoading) {
    //     return (
    //         <PageCenter>
    //             <Lamp />
    //         </PageCenter>
    //     );
    // }
    //
    // if (!authStore.isAuth) {
    //     return <GuestApp />;
    // }

    return <UserApp />;
});

export { App };
