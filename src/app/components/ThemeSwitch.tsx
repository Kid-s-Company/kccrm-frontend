import {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {IconButton, Tooltip} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Moon icon
import LightModeIcon from '@mui/icons-material/LightMode';
import {useTranslation} from "react-i18next"; // Sun icon
import {Sun} from "@phosphor-icons/react";
import {toggleTheme} from "../../features/theme/themeSlice.ts";

const ThemeSwitch: FC = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const handleToggle = () => {
        dispatch(toggleTheme());
    }

    return (
        <Tooltip title={t('Dark/Light Mode')}>
            <IconButton onClick={handleToggle} color="inherit">
                {mode === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
            </IconButton>
        </Tooltip>
    );
}

export const TwoToneThemeSwitch: FC = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const handleToggle = () => {
        dispatch(toggleTheme());
    }

    return (
        <Tooltip title={t('Dark/Light Mode')}>
            <IconButton onClick={handleToggle} color="inherit">
                {mode === 'light' ? <Sun size={24} weight="duotone" /> : <Sun size={24} weight="duotone" />}
            </IconButton>
        </Tooltip>
    );
}

export default ThemeSwitch;