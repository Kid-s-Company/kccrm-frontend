// src/app/store/authSlice.ts
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authenticate} from './authentication/authenticate';
import userpool from "./authentication/userpool.ts";
import {CognitoUserSession} from "amazon-cognito-identity-js";

/**
 * Represents the authentication state of a user within an application.
 * This interface is used to define the shape of the state for handling
 * authentication and authorization-related data in the application.
 *
 * Properties:
 * - `status`: The current state of the authentication process. It can have one of four values:
 *    - 'idle': No operation is currently taking place.
 *    - 'loading': Authentication or authorization is in progress.
 *    - 'succeeded': Authentication or authorization was successful.
 *    - 'failed': Authentication or authorization failed.
 *
 * - `isAuthenticated`: A boolean flag indicating whether the user is currently authenticated.
 *
 * - `error`: A string holding an error message in case the authentication process fails.
 *   If there is no error, this property will be null.
 *
 * - `username`: An optional string representing the username of the currently authenticated user.
 *   This is used to store the name of the logged-in user. If no user is logged in, this property is null.
 */
interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isAuthenticated: boolean;
    error: string | null;
    username: string | null; // optional, if you want to store who is logged in
}

const initialState: AuthState = {
    status: 'idle',
    isAuthenticated: false,
    error: null,
    username: null,
};

/**
 * A Redux Thunk for handling user login via asynchronous operations.
 *
 * This thunk uses the `createAsyncThunk` utility from Redux Toolkit to perform
 * the login flow. It expects an object with `email` and `password` as input,
 * performs authentication using the `authenticate` function, and handles
 * either successful login or various error cases. If the authentication is
 * successful, the session is automatically stored by the underlying
 * `authenticateUser` handling mechanism, and a response containing the
 * username is returned. In case of an error, the thunk will reject
 * with an appropriate error message.
 *
 * Actions:
 * - Pending: Dispatched when the async process begins.
 * - Fulfilled: Dispatched when the authentication is successful.
 * - Rejected: Dispatched when an error occurs.
 *
 * Input Parameters:
 * - `email`: The email address of the user attempting to login.
 * - `password`: The password of the user.
 *
 * Output:
 * - On success: Returns an object containing the `username`.
 * - On failure: Rejects with an error message string.
 */
export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            // authenticate() uses CognitoUser.authenticateUser under the hood
            // which will store the session automatically if successful
            await authenticate(email, password);
            // If we're here, Cognito handled storing tokens. We only return something simple.
            return { username: email };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Login failed');
        }
    }
);

/**
 * An asynchronous thunk action for initializing user authentication.
 *
 * This action attempts to retrieve the currently logged-in user from the user pool.
 * If a user is found, it checks whether the session is valid, and if so, resolves with the user's username.
 * If no user is found or if the session is invalid, the thunk action rejects with an appropriate error.
 *
 * @constant {AsyncThunk}
 * @name initializeAuthThunk
 * @memberof auth
 *
 * @throws Will reject with 'No current user' if there is no currently logged-in user.
 * @throws Will reject with an error if the session retrieval fails or the session is invalid.
 *
 * @return {Promise<{ username: string }>} Resolves with the username of the authenticated user.
 */
export const initializeAuthThunk = createAsyncThunk(
    'auth/initializeAuth',
    async (_, { rejectWithValue }) => {
        const user = userpool.getCurrentUser();
        if (!user) {
            return rejectWithValue('No current user');
        }
        return new Promise<{ username: string }>((resolve, reject) => {
            user.getSession((err: Error | null, session: CognitoUserSession | null) => {
                if (err || !session || !session.isValid()) {
                    return reject(err || 'Session invalid');
                }
                const username = user.getUsername();
                //console.log("username", username);
                //this prints username 996e84f8-8041-70c0-6c7f-053e0daad09d
                resolve({ username });
            });
        });
    }
);


/**
 * A Redux slice that manages authentication state, including user login, logout, and session initialization.
 *
 * This slice defines the initial state, reducers, and extra reducers to handle asynchronous thunks for authentication workflows.
 *
 * State Shape:
 * - `isAuthenticated` (boolean): Indicates whether a user is authenticated.
 * - `status` (string): Represents the current status of the authentication process (e.g., 'idle', 'loading', 'succeeded', 'failed').
 * - `username` (string|null): Stores the authenticated user's username if available, or `null` if unauthenticated.
 * - `error` (string|null): Stores any error message encountered during authentication actions, or `null` if there's no error.
 *
 * Reducers:
 * - `logout`: Logs out the currently authenticated user by clearing their session and resetting the authentication state.
 *
 * Extra Reducers:
 * - Handles the different states (pending, fulfilled, rejected) of `loginThunk` and `initializeAuthThunk` to manage login and session initialization.
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            const user = userpool.getCurrentUser();
            if (user) {
                user.signOut(); // This clears tokens from local storage
            }

            state.isAuthenticated = false;
            state.status = 'idle';
            state.username = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.username = action.payload.username; // store username if needed
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.username = null;
            })
            .addCase(initializeAuthThunk.pending, (state) => {
                // You might set a loading state for initialization if you want
                state.status = 'loading';
            })
            .addCase(initializeAuthThunk.fulfilled, (state, action) => {
                // Session is valid, user is authenticated
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.error = null;
            })
            .addCase(initializeAuthThunk.rejected, (state) => {
                // No valid session found or error retrieving session
                state.status = 'idle';
                state.isAuthenticated = false;
                state.username = null;
            });

    },
});

export const { logout } = authSlice.actions;
