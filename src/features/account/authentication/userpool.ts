import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: import.meta.env.VITE_USER_POOL_ID,  // Environment variable for User Pool ID
    ClientId: import.meta.env.VITE_APP_CLIENT_ID   // Environment variable for App Client ID
};

export default new CognitoUserPool(poolData);