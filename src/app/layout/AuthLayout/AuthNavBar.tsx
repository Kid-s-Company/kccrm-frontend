import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ThemeSwitch from "../../components/ThemeSwitch.tsx";
import {useAppSelector, useAppDispatch} from "../../store/store.ts";
import LanguageDialog from "../../multilingual/languageDialog.tsx";
import {logout} from "../../../features/account/authSlice.ts";

const pages = ['Home', 'Products', 'Pricing', 'Contact'];

const AuthNavBar = React.forwardRef<HTMLElement>(
    (_, ref) => {
        const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
        const themeMode = useAppSelector((state) => state.theme.mode);
        const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
        const dispatch = useAppDispatch();

        const {t} = useTranslation();
        const navigate = useNavigate();

        const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElNav(event.currentTarget);
        };

        const handleCloseNavMenu = () => {
            setAnchorElNav(null);
        };

        const handleLogout = () => {
            dispatch(logout());
            navigate('/');
        };

        return (
            <AppBar ref={ref} position="static" elevation={0} sx={{
                backgroundColor: themeMode === 'light' ? 'rgba(247, 249, 251, 1)' : 'rgba(255, 255, 255, 0.05)',
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{flex: 1, display: {xs: 'none', md: 'flex'}, alignItems: 'center'}}>
                            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    display: {xs: 'none', md: 'flex'},
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                IntelliPair
                            </Typography>
                        </Box>

                        {/*Mobile*/}
                        <Box sx={{flex: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{flex: 1, display: {xs: 'flex', md: 'none'}, justifyContent: 'center'}}>
                            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    display: {xs: 'flex', md: 'none'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                LOGO
                            </Typography>
                        </Box>

                        {/*Desktop*/}
                        <Box sx={{flex: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'center', gap: 4}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{display: 'block'}}
                                    variant='text'
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center'}}>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <ThemeSwitch/>
                                <LanguageDialog/>
                            </Box>
                            {isAuthenticated ? (
                                <Button variant='contained' size='small' disableElevation
                                        onClick={handleLogout}>
                                    {t('Logout')}
                                </Button>
                            ) : (
                                <>
                                    <Button variant='lightContained' size='small' disableElevation
                                            sx={{maxWidth: '86px', maxHeight: '64px'}}
                                            onClick={() => navigate('signup')}
                                    >
                                        {t('Sign up')}
                                    </Button>
                                    <Button variant='contained' size='small' disableElevation
                                            sx={{display: {xs: 'none', md: 'block'}}}
                                            onClick={() => navigate('login')}
                                    >
                                        {t('Sign in')}
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
);

export default AuthNavBar;
