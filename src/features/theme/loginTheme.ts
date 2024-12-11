import { createTheme } from '@mui/material/styles';
import {ThemeMode} from "./themeTypes.ts";

export const getLoginTheme = (mode: ThemeMode) => createTheme({
    palette: {
        mode,
        primary: {
            main: mode === 'light' ? '#ffffff' : 'rgba(28, 28, 28, 1)',
        },
        secondary: {
            main: '#ff9100',
        },
        background: {
            default: mode === 'light' ? '#ffffff' : '#121212',
            //paper: mode === 'light' ? '#ffffff' : '#424242',
        },
        text: {
            primary: mode === 'light' ? 'rgba(28, 28, 28, 1) !important' : 'rgba(255, 255, 255, 1) !important',
        },
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    margin: '8px',
                    height: '36px',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*::-webkit-scrollbar': {
                    width: '10px',
                },
                '*::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '*::-webkit-scrollbar-thumb': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(28,28,28,0.15)',
                    borderRadius: '10px',
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(28,28,28,0.25)',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: { // Targeting the root slot of Typography
                    color: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)',
                },
            },
            variants: [
                {
                    props: { variant: 'unimportantSubtitle' },
                    style: {
                        color: mode === 'light' ? 'rgba(28, 28, 28, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                    },
                },
                {
                    props: { variant: 'link1' },
                    style: {
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        color: 'rgba(149, 164, 252, 1)',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                // This will apply to all variants of the Button component
                root: {
                    textTransform: 'none', // Disable text transformation
                    color: 'rgba(28, 28, 28, 1)'
                },
            },
            variants: [
                {
                    props: {variant: 'outlined'},
                    style: {
                        color: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)',
                        borderColor: mode === 'light' ? 'rgba(28, 28, 28, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        '&:hover': {
                            borderColor: mode === 'light' ? 'rgba(28, 28, 28, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: mode === 'light' ? 'rgba(28, 28, 28, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                        }
                    }
                },
                {
                    props: { variant: 'lightContained' },
                    style: {
                        color: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)',
                        backgroundColor: mode === 'light' ? 'rgba(28, 28, 28, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                            backgroundColor: mode === 'light' ? 'rgba(28, 28, 28, 0.1)' : 'rgba(255, 255, 255, 0.15)'
                        },
                        padding: '4px 8px',
                        borderRadius: '8px'
                    },
                },
                {
                    props: { variant: 'contained' },
                    style: {
                        color: mode === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 28, 1)',
                        backgroundColor: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(198, 199, 248, 1)',
                        '&:hover': {
                            backgroundColor: mode === 'light' ? 'rgba(28, 28, 28, 0.85)' : 'rgb(210,211,248)'
                        },
                        padding: '4px 8px',
                        borderRadius: '8px'
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        color: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)',
                        '&:hover': {
                            backgroundColor: mode === 'light' ? 'rgba(28, 28, 28, 0.04)' : 'rgba(255, 255, 255, 0.05)',
                        },
                    }
                }
            ],
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    // Styles applied to the root element
                }
            },
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        // Your custom styles for outlined textboxes
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
                                borderRadius: '12px'
                            },
                            '&:hover fieldset': {
                                borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)', // Example focus color
                                borderWidth: '2px', // Make the border thicker on focus for better accessibility
                            }
                        },
                        '& .MuiInputLabel-root': {
                            // Optional: Custom styles for the label
                            color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                                color: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)', // Example focus color
                            }
                        },
                        '& .MuiInputBase-input': {
                            color: mode === 'light' ? 'rgba(28, 28, 28, 1)' : 'rgba(255, 255, 255, 1)', // Text color
                        }
                    }
                }
            ]
        },
    },
});