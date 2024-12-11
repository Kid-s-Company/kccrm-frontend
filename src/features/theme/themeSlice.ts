import { createSlice } from '@reduxjs/toolkit';
import {ThemeMode} from "./themeTypes.ts";

function isThemeMode(value: any): value is ThemeMode {
    return ['light', 'dark'].includes(value);
}

const getInitialTheme = (): ThemeMode => {
    // Try to fetch the theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && isThemeMode(savedTheme)) {
        return savedTheme;
    }

    // If there is no saved theme, use the system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: getInitialTheme(),
    },
    reducers: {
        toggleTheme: (state) => {
            const newMode = state.mode === 'light' ? 'dark' : 'light';
            state.mode = newMode;
            // Set the new theme in localStorage
            localStorage.setItem('theme', newMode);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
