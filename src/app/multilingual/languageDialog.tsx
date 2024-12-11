import {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import {ListItemButton, Tooltip} from "@mui/material";
import {GlobeHemisphereWest} from "@phosphor-icons/react";
import i18n from "./i18n.ts";

const languages = [
    {code: 'en', name: 'English'},
    {code: 'zh-CN', name: '中文（简体）'},
    {code: 'de', name: 'Deutsch'},
];

const LanguageDialog: FC = () => {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
        handleClose();
    };

    return (
        <div>
            <Tooltip title={t('Language')}>
                <IconButton color="inherit" onClick={handleClickOpen}>
                    <GlobeHemisphereWest size={24} weight="duotone" />
                </IconButton>
            </Tooltip>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{t('Choose a Language')}</DialogTitle>
                <List>
                    {languages.map((language) => (
                        <ListItemButton onClick={() => handleListItemClick(language.code)} key={language.code}>
                            <ListItemText primary={language.name}/>
                        </ListItemButton>
                    ))}
                </List>
            </Dialog>
        </div>
    );
};

export default LanguageDialog;
