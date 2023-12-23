import React, { FC, useEffect, useState } from 'react';
import { Theme, ThemeProvider } from '@quarx-ui/core';
import { darkTheme, getStorageTheme, THEMES } from '@shared/styles/themes';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { THEME_TYPE } from '@shared/styles/types';
import { LOCAL_STORAGE_KEYS, localStorage } from '@shared/lib/local-storage';
import { ThemeProps } from './types';
import { mapPaletteTypeToThemeType } from './maps';
import './theme.sass';

// esm не подгрузит без require
// @ts-ignore
require('@quarx-ui/core/styles/fonts/font-faces.css');

const Theme: FC<ThemeProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(darkTheme);

    useEffect(() => {
        const typeFromStorage = getStorageTheme();
        setTheme(THEMES[typeFromStorage]);
    }, []);

    useEffect(() => {
        const onThemeChange = ({
            detail: type,
        }: CustomEvent<THEME_TYPE>): void => {
            const newTheme = THEMES[type] ?? THEMES.dark;

            setTheme(newTheme);
            localStorage.set(
                LOCAL_STORAGE_KEYS.themeType,
                mapPaletteTypeToThemeType[newTheme.palette.type],
            );
        };

        eventBus.on(EVENT_TYPE.theme, onThemeChange);

        return () => {
            eventBus.off(EVENT_TYPE.theme, onThemeChange);
        };
    }, []);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { Theme };
