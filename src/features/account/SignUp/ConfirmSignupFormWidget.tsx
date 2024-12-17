import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { confirmSignUp } from '../authentication/authenticate';
import { toast } from 'react-toastify';

interface ConfirmSignupFormProps {
    email: string;
}

// Validation schema for confirmation code
const confirmSchema = yup.object().shape({
    code: yup.string().required('Verification code is required').matches(/^\d{6}$/, 'Invalid verification code')
});

type ConfirmValues = {
    code: string;
};

export default function ConfirmSignupFormWidget({ email }: ConfirmSignupFormProps) {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ConfirmValues>({
        resolver: yupResolver(confirmSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: ConfirmValues) => {
        try {
            await confirmSignUp(email, data.code);
            toast.success('Confirmation successful! You can now login.');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Confirmation failed';
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
                <Typography variant="h4" component="h2" sx={{ fontSize: '30px' }}>
                    {t('Confirm Your Email')}
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
                <Typography>
                    {t('A verification code has been sent to')}: {email}
                </Typography>
                <TextField
                    label={t("Verification Code")}
                    variant="outlined"
                    fullWidth
                    {...register("code")}
                    error={Boolean(errors.code)}
                    helperText={errors.code?.message}
                />

                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : t('Confirm')}
                </Button>
            </Box>
        </Paper>
    );
}
