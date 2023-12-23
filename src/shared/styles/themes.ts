import { createTheme, Theme } from '@quarx-ui/core';
import { THEME_TYPE } from './types';
import { LOCAL_STORAGE_KEYS, localStorage } from '@shared/lib/local-storage';

const lightTheme = createTheme({
    palette: { type: 'light' },
});

const darkTheme = createTheme({
    palette: { type: 'dark' },
});

const THEMES: Record<THEME_TYPE, Theme> = {
    [THEME_TYPE.light]: lightTheme,
    [THEME_TYPE.dark]: darkTheme,
};

const getStorageTheme = (): THEME_TYPE => {
    const types = Object.values(THEME_TYPE);
    const typeFromLocalStorage = localStorage.get<THEME_TYPE>(
        LOCAL_STORAGE_KEYS.themeType,
    );

    if ((types as (string | null)[]).includes(typeFromLocalStorage)) {
        return typeFromLocalStorage as THEME_TYPE;
    }

    return THEME_TYPE.dark;
};

export { lightTheme, darkTheme, THEMES, getStorageTheme };
