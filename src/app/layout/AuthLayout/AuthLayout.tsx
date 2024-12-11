import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {Outlet} from "react-router-dom";
import AuthNavBar from "./AuthNavBar.tsx";

const AuthLayout:React.FC = () => {
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    const navBarRef = useRef<HTMLElement>(null);
    const [appBarHeight, setAppBarHeight] = useState(0);

    useEffect(() => {
        if (navBarRef.current) {
            setAppBarHeight(navBarRef.current.clientHeight);
        }
    }, []);

    return (
        <Box>
            <AuthNavBar ref={navBarRef}/>
            <Container sx={{
                backgroundColor: themeMode === 'light' ? 'rgba(247, 249, 251, 1)' : 'rgba(255, 255, 255, 0.05)',
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: `calc(100vh - ${appBarHeight}px)`,
                minWidth: '100%',
                boxSizing: 'border-box',

            }}>
                <Outlet/>
            </Container>
        </Box>
    )
}

export default AuthLayout;