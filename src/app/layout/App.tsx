import {useEffect} from 'react';
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { Outlet, useLocation, Location } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getLoginTheme } from "../../features/theme/loginTheme";
import { getMainTheme } from "../../features/theme/mainTheme";
import { initializeAuthThunk } from "../../features/account/authSlice";
import agent from "../api/agent"; // Import the axios agent defined earlier

function App() {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const mode = useAppSelector(state => state.theme.mode);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    const getTheme = (location: Location): Theme => {
        if (location.pathname.startsWith('/auth')) {
            return getLoginTheme(mode);
        }
        return getMainTheme(mode);
    };

    const theme = getTheme(location);

    useEffect(() => {
        // Attempt to restore a session on app load
        dispatch(initializeAuthThunk());
    }, [dispatch]);

    useEffect(() => {
        // Once we know the user is authenticated, test the protected endpoint
        if (isAuthenticated) {
            agent.ProtectedAPI.testProtected()
                .then(data => {
                    console.log("Protected endpoint response:", data);
                })
                .catch(error => {
                    console.error("Error calling protected endpoint:", error);
                });
        }
    }, [isAuthenticated]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Outlet/>
        </ThemeProvider>
    );
}

export default App;
