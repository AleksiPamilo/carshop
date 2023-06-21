
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fi from "@/dictionaries/fi.json";
import en from "@/dictionaries/en.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            fi: { translation: fi },
            en: { translation: en },
        },
        lng: "fi",
        fallbackLng: "fi",

        interpolation: {
            escapeValue: false
        }
    });