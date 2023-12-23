import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Button } from '@quarx-ui/core';
import { userStore } from '@entities/user';

const ReloadCurrentUserButton: FC = observer(() => (
    <Button
        loading={userStore.loadingCurrentUser}
        disabled={userStore.loadingCurrentUser}
        onClick={userStore.getMe}
        color="secondary"
        type="outlined"
        size="xSmall"
    >
        Загрузить пользователя
    </Button>
));

export { ReloadCurrentUserButton };
