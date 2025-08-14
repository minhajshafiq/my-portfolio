"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Initialisation d'i18next
i18n
    .use(Backend) // Charge les fichiers JSON via HTTP
    .use(LanguageDetector) // Active la détection depuis le segment de chemin (/fr, /en)
    .use(initReactI18next) // Initialise i18next avec React
    .init({
        fallbackLng: "fr", // Utilisé si aucun segment n'est défini
        debug: process.env.NODE_ENV === "development", // Active les logs en mode développement uniquement
        interpolation: {
            escapeValue: false, // Pas besoin d'échapper les valeurs (React s'en occupe)
        },
        backend: {
            loadPath: "/locales/{{lng}}/common.json", // Chemin d'accès aux fichiers de traduction
        },
        detection: {
            order: ["path", "cookie", "localStorage"],
            lookupFromPathIndex: 0,
            caches: ["localStorage", "cookie"],
            lookupLocalStorage: "i18nextLng",
            lookupCookie: "i18next",
        },
        react: {
            useSuspense: false, // Désactive le suspense pour les composants React (utile si vous ne voulez pas attendre le chargement des traductions)
        },
        // Option de gestion des erreurs de chargement
        initImmediate: false, // Diffère l'initialisation pour éviter un problème de synchronisation
        load: "languageOnly", // Charge uniquement la langue sans le pays (en, fr, etc.)
    })
    .then(() => {
        console.log("i18next initialized successfully");
    })
    .catch((error) => {
        console.error("i18next initialization failed", error);
    });

export default i18n;
