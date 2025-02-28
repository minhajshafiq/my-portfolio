"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Initialisation d'i18next
i18n
    .use(Backend) // Charge les fichiers JSON via HTTP
    .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
    .use(initReactI18next) // Initialise i18next avec React
    .init({
        fallbackLng: "en", // Langue par défaut si la langue détectée n'est pas disponible
        debug: process.env.NODE_ENV === "development", // Active les logs en mode développement uniquement
        interpolation: {
            escapeValue: false, // Pas besoin d'échapper les valeurs (React s'en occupe)
        },
        backend: {
            loadPath: "/locales/{{lng}}/common.json", // Chemin d'accès aux fichiers de traduction
        },
        detection: {
            order: ["navigator", "localStorage", "cookie"], // Priorité à la langue du navigateur
            caches: ["localStorage", "cookie"], // Caches utilisées pour garder la langue entre les sessions
            lookupLocalStorage: "i18nextLng", // Clé pour récupérer la langue stockée dans localStorage
            lookupCookie: "i18next", // Clé pour récupérer la langue dans les cookies
            lookupFromPathIndex: 0, // Cherche la langue dans l'URL (si présente)
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
