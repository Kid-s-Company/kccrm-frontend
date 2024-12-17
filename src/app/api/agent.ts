import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import userPool from "../../features/account/authentication/userpool.ts";

interface ApiError {
    title?: string;
    errors?: Record<string, string[]>;
}

// Set your baseURL to your Cognito-protected API endpoint
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function responseBody<T>(response: AxiosResponse<T>): T {
    return response.data;
}

function getCurrentSession(): Promise<CognitoUserSession | null> {
    return new Promise((resolve) => {
        const user = userPool.getCurrentUser();
        if (!user) return resolve(null);
        user.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err || !session || !session.isValid()) return resolve(null);
            resolve(session);
        });
    });
}

// Request Interceptor
axios.interceptors.request.use(async (config) => {
    const session = await getCurrentSession();
    if (session && config.headers) {
        config.headers.Authorization = `Bearer ${session.getIdToken().getJwtToken()}`;
    }
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

// Response Interceptor
axios.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError<ApiError>) => {
    if (!error.response) {
        toast.error('Network error. No response received.');
        return Promise.reject(error);
    }

    const { data, status } = error.response;
    switch (status) {
        case 400:
            if (data?.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(...data.errors[key]);
                    }
                }
                // Throw an array of modelStateErrors
                throw modelStateErrors;
            }
            toast.error(data.title || 'Bad Request');
            break;
        case 401:
            toast.error(data.title || 'Unauthorized');
            break;
        case 403:
            toast.error("No Permission");
            break;
        case 500:
            console.error('Server error:', data);
            toast.error('Server error');
            break;
        default:
            toast.error('An unexpected error occurred');
            break;
    }
    return Promise.reject(error.response);
});

const requests = {
    get: <T>(url: string): Promise<T> => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: unknown): Promise<T> => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: unknown): Promise<T> => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string): Promise<T> => axios.delete<T>(url).then(responseBody),
};

const ProtectedAPI = {
    // Example endpoint requiring authorization
    testProtected: <T>() => requests.get<T>('/protected')
};

const agent = {
    ProtectedAPI
};

export default agent;