export const localeConfig = {
    defaultLocale: "fi",
    locales: ["fi", "en"],
} as const;

export type Locale = typeof localeConfig.locales[number];