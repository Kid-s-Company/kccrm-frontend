export type ThemeMode = 'light' | 'dark';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        lightContained: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        unimportantSubtitle: true;
        link1: true;
    }
}