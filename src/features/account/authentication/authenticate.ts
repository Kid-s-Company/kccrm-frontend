import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession} from 'amazon-cognito-identity-js';
import userpool from './userpool.ts';

// Type definition for the authentication function's parameters
export const authenticate = (Email: string, Password: string): Promise<CognitoUserSession> => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: Email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log("login successful");
                resolve(result);
            },
            onFailure: (err) => {
                console.log("login failed", err);
                reject(err);
            }
        });
    });
};

/**
 * Registers a new user in the Cognito user pool.
 *
 * @param {string} email - The email address of the user to be registered.
 * @param {string} password - The password for the new user account.
 * @param {Object.<string, string>} attributes - An object representing additional attributes for the user,
 *                                                where keys are the attribute names and values are their corresponding values.
 * @returns {Promise<string>} A promise that resolves with the user's email upon successful registration,
 *                            or rejects with an error if the registration fails.
 */
export const signUpUser = (email: string, password: string, attributes: { [key: string]: string })=>
{
    return new Promise((resolve, reject) => {
        const attributeList = Object.entries(attributes).map(
            ([Name, Value]) => new CognitoUserAttribute({Name, Value}));

        userpool.signUp(email, password, attributeList, [], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (!result?.user) {
                    return reject(new Error('No user returned by Cognito during signup.'));
                }

                resolve(email);
            }
        )
    });
}

/**
 * Confirm the user’s email using the code sent by Cognito.
 * After this step, the user can log in with their email/username and password.
 * @param email The same email/username used during signup
 * @param confirmationCode The code the user received in their email
 * @returns A promise that resolves on successful confirmation or rejects with an error
 */
export function confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: email, Pool: userpool });

        user.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                return reject(err);
            }
            console.log('User confirmed successfully:', result);
            // The user is now confirmed and can log in.
            resolve();
        });
    });
}