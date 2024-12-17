import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    CognitoUser,
    CognitoUserSession,
    CognitoIdToken,
    CognitoAccessToken,
    CognitoRefreshToken
} from 'amazon-cognito-identity-js';
import userPool from './authentication/userpool.ts';
import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function createCognitoUserSession(idToken: string, accessToken: string, refreshToken?: string): CognitoUserSession {
    const idTokenObj = new CognitoIdToken({ IdToken: idToken });
    const accessTokenObj = new CognitoAccessToken({ AccessToken: accessToken });
    const refreshTokenObj = new CognitoRefreshToken({ RefreshToken: refreshToken || '' });

    return new CognitoUserSession({
        IdToken: idTokenObj,
        AccessToken: accessTokenObj,
        RefreshToken: refreshTokenObj
    });
}

function storeSessionInLocalStorage(username: string, idToken: string, accessToken: string, refreshToken?: string) {
    const clientId = userPool.getClientId();
    localStorage.setItem(`CognitoIdentityServiceProvider.${clientId}.${username}.idToken`, idToken);
    localStorage.setItem(`CognitoIdentityServiceProvider.${clientId}.${username}.accessToken`, accessToken);
    if (refreshToken) {
        localStorage.setItem(`CognitoIdentityServiceProvider.${clientId}.${username}.refreshToken`, refreshToken);
    }

    localStorage.setItem(`CognitoIdentityServiceProvider.${clientId}.LastAuthUser`, username);
}

function decodeTokenPayload(token: string) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

export default function CallbackPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        async function handleCodeExchange() {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const errorParam = urlParams.get('error');
            const errorDescription = urlParams.get('error_description');

            // If there's an error in the callback params, handle it
            if (errorParam || errorDescription) {
                console.error('Callback error:', errorParam, errorDescription);
                toast.error(t('Authentication failed. Please try again.'));
                navigate('/auth/login');
                return;
            }

            if (!code) {
                console.error('No code found in URL');
                toast.error(t('No authorization code found.'));
                navigate('/auth/login');
                return;
            }

            try {
                const tokenEndpoint = `https://${COGNITO_DOMAIN}/oauth2/token`;
                const data = new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: CLIENT_ID,
                    redirect_uri: REDIRECT_URI,
                    code: code
                });

                const response = await axios.post(tokenEndpoint, data.toString(), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                const { id_token, access_token, refresh_token } = response.data;

                const payload = decodeTokenPayload(id_token);
                const username = payload['cognito:username'] || payload['sub'] || 'google_user';

                const user = new CognitoUser({
                    Username: username,
                    Pool: userPool
                });

                const session = createCognitoUserSession(id_token, access_token, refresh_token);
                user.setSignInUserSession(session);
                storeSessionInLocalStorage(username, id_token, access_token, refresh_token);

                toast.success(t('Logged in successfully!'));
                navigate('/');
            } catch (error) {
                console.error('Failed to exchange code for tokens', error);
                toast.error(t('Authentication failed. Please try again.'));
                navigate('/auth/login');
            }
        }

        handleCodeExchange();
    }, [navigate, t]);

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
                    {t('Sign In')}
                </Typography>
                <Typography variant="unimportantSubtitle" sx={{ marginBottom: 2 }}>
                    {t('Processing your login, please wait...')}
                </Typography>
            </Box>
            <CircularProgress />
        </Paper>
    );
}
