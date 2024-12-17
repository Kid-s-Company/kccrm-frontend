import {createBrowserRouter} from "react-router-dom";
import App from "../layout/App.tsx";
import AuthLayout from "../layout/AuthLayout/AuthLayout.tsx";
import LoginWidget from "../../features/account/LoginWidget.tsx";
import SignupPage from "../../features/account/SignUp/SIgnupPage.tsx";
import CallbackPage from "../../features/account/Callback.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'auth',
                element: <AuthLayout/>,
                children: [
                    {path: 'login', element: <LoginWidget/>},
                    {path: 'signup', element: <SignupPage/>},
                    {path: 'callback', element: <CallbackPage/>}
                ]
            }
        ]
    }
]);