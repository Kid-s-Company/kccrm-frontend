import {createBrowserRouter} from "react-router-dom";
import App from "../layout/App.tsx";
import AuthLayout from "../layout/AuthLayout/AuthLayout.tsx";
import LoginWidget from "../../features/account/LoginWidget.tsx";
import SignupWidget from "../../features/account/SIgnupWidget.tsx";

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
                    {path: 'signup', element: <SignupWidget/>},
                ]
            }
        ]
    }
]);