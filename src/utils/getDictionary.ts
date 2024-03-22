"use server";

import { Locale } from "../../locale-config";

const dictionaries = {
    fi: () => import("@/dictionaries/fi.json").then((module) => module.default),
    en: () => import("@/dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
    const dictionary = dictionaries[locale];

    if (!dictionary) {
        return dictionaries.fi();
    }

    return dictionary();
}
