"use client"

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
    .use(Backend) // Charge les fichiers JSON
    .use(LanguageDetector) // Détecte la langue du navigateur
    .use(initReactI18next) // Initialise avec React
    .init({
        fallbackLng: "en", // Langue par défaut
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/common.json", // Chemin vers les fichiers JSON
        },
        detection: {
            order: ["navigator", "localStorage", "cookie"], // Détection automatique
            caches: ["localStorage", "cookie"],
        },
    });

export default i18n;
