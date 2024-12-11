import {CssBaseline, Theme, ThemeProvider} from "@mui/material";
import {Outlet, useLocation, Location} from "react-router-dom";
import {useAppSelector} from "../store/store.ts";
import {getLoginTheme} from "../../features/theme/loginTheme.ts";
import {getMainTheme} from "../../features/theme/mainTheme.ts";

function App() {
    // Get theme based on location
    const location = useLocation();
    const mode = useAppSelector(state => state.theme.mode);
    const getTheme = (location: Location): Theme => {
        if (location.pathname.startsWith('/auth')) {
            return getLoginTheme(mode);
        }
        return getMainTheme(mode);
    };
    const theme = getTheme(location)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Outlet/>
        </ThemeProvider>
    )
}

export default App
