import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend)           // Allows lazy loading translations
    .use(LanguageDetector)      // Detects language automatically (from browser settings, path, etc.)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        // Where to fetch translation files from:
        backend: {
            loadPath: '/locales/{{lng}}.json' // Customize as needed
        },
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;