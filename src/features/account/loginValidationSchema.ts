import * as yup from 'yup';

export const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email('Please provide a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(64, 'Password cannot be longer than 64 characters')
        .required('Password is required'),
}).required();