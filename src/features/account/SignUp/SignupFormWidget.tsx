import {useForm} from 'react-hook-form';
import {Box, Button, CircularProgress, Paper, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {signUpUser} from '../authentication/authenticate';
import {toast} from 'react-toastify';

interface SignupFormProps {
    onSuccess: (email: string) => void;
}

// Validation schema using yup
const signupValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    name: yup.string().required('Name is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm your password')
});

type FormValues = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
};

export default function SignupFormWidget({ onSuccess }: SignupFormProps) {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
        resolver: yupResolver(signupValidationSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await signUpUser(data.email, data.password, data.name ? { name: data.name } : {});
            toast.success('Signup successful! Please check your email for a verification code.');
            onSuccess(data.email);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Signup failed';
            toast.error(errorMessage);
        }
    };

    return (
        <Paper
            sx={{
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                borderRadius: '24px',
                minWidth: { xs: '340px', md: '680px' },
                minHeight: { xs: '680px', md: '656px' },
                padding: { sx: '40px 20px', md: '40px 150px' },
                gap: 3
            }}
            elevation={0}
        >
            <Box sx={{ my: '10px', textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ fontSize: '30px', marginBottom: 1 }}>
                    {t('Sign Up')}
                </Typography>
            </Box>
            <Box
                component="form"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label={t("Email")}
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                />
                <TextField
                    label={t("Name")}
                    variant="outlined"
                    fullWidth
                    {...register("name")}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                />
                <TextField
                    label={t("Password")}
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("password")}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                />
                <TextField
                    label={t("Confirm Password")}
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("confirmPassword")}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                />

                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : t('Sign Up')}
                </Button>
            </Box>

            <Typography variant="unimportantSubtitle" sx={{ mt: 2 }}>
                {t('Already have an account?')}{' '}
                <Typography
                    variant="link1"
                    component={Link}
                    to="/auth/login"
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                    {t('Sign In')}
                </Typography>
            </Typography>
        </Paper>
    );
}
