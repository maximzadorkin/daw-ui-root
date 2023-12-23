/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FC, useEffect, useMemo } from 'react';
import { Stack, Switcher, useBooleanState } from '@quarx-ui/core';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { mapStateToThemeType } from './maps';
import { THEME_TYPE } from '@shared/styles/types';
import { getStorageTheme } from '@shared/styles/themes';

// todo: Потом можно значение этого свойства перенести в api, а не в локальное хранение
const ChangeThemeSwitch: FC = () => {
    const initialThemeState = useMemo(() => {
        const storageThemeType = getStorageTheme();
        return storageThemeType === THEME_TYPE.light;
    }, []);

    const [active, { toggleState: toggleActiveState }] =
        useBooleanState(initialThemeState);

    useEffect(() => {
        eventBus.emit(
            EVENT_TYPE.theme,
            mapStateToThemeType[active.toString()] ?? THEME_TYPE.dark,
        );
    }, [active]);

    return (
        <Stack direction="row">
            <Switcher
                checked={active}
                onChange={toggleActiveState}
                color="secondary"
            >
                Светлая тема
            </Switcher>
        </Stack>
    );
};

export { ChangeThemeSwitch };
