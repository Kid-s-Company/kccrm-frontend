import { Button, TextField, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignupWidget() {
    const { t } = useTranslation();

    // Hardcoded loading value for demonstration. No dynamic functionality.
    const loading = false;

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
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize: '30px', marginBottom: 1 }}>
                    {t('Sign Up')}
                </Typography>
                <Typography variant="unimportantSubtitle" sx={{ marginBottom: 2 }}>
                    {t('Dev Only, not for final product signup')}
                </Typography>
            </Box>
            {/* Static form with translated labels */}
            <form>
                <TextField
                    label={t('Email')}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label={t('Name')}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label={t('Phone (Optional)')}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label={t('Password')}
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label={t('Confirm Password')}
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button type="button" variant="contained" fullWidth>
                    {loading ? <CircularProgress size={24} /> : t('Sign Up')}
                </Button>
            </form>
            <Typography variant="unimportantSubtitle" sx={{ mt: 2 }}>
                {t('Already have an account?')}{' '}
                <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                    <Typography variant="link1">
                        {t('Sign In')}
                    </Typography>
                </Link>
            </Typography>
        </Paper>
    );
}