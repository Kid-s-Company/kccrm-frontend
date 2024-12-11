import { Button, TextField, Box, Typography, Divider, Paper } from '@mui/material';
import { useTranslation } from "react-i18next";

const ColoredGoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
        <path fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12
              c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20
              c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002
              l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

export default function LoginWidget() {
    const { t } = useTranslation();

    return (
        <Paper
            sx={{
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2px',
                p: 4,
                borderRadius: '24px',
                minWidth: { xs: '340px', md: '680px' },
                minHeight: { xs: '680px', md: '656px' },
                padding: { sx: '40px 20px', md: '40px 150px' }
            }}
            elevation={0}
        >
            <Box sx={{ my: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize: '30px' }}>
                    {t('Sign In')}
                </Typography>
                <Typography variant="unimportantSubtitle" gutterBottom>
                    {t('Dev Only')}
                </Typography>
            </Box>

            <Button
                startIcon={<ColoredGoogleIcon />}
                variant="outlined"
            >
                {t('Sign in with Google')}
            </Button>

            <Divider sx={{ width: '100%', my: 2 }}>
                <Typography variant="unimportantSubtitle">{t('Or with Email')}</Typography>
            </Divider>

            <Box component="form">
                <TextField
                    label={t("Email")}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label={t("Password")}
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Typography variant="link1" sx={{ alignSelf: 'flex-end', textDecoration: 'none' }}>
                    {t('Forgot Password?')}
                </Typography>
                <Button variant="contained" fullWidth>
                    {t('Sign In')}
                </Button>
            </Box>

            <Typography variant="unimportantSubtitle" sx={{ mt: 2 }}>
                {t('Not a Member yet?')}{' '}
                <Typography variant="link1" component="span">
                    {t('Sign up')}
                </Typography>
            </Typography>
        </Paper>
    );
}