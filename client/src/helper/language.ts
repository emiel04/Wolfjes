const ALLOWED_LANGUAGES = ["en", "nl"] as const;
type LanguageType = (typeof ALLOWED_LANGUAGES)[number];

export const Language = {
    ALLOWED: ALLOWED_LANGUAGES,
    is: (lang: string | null): lang is LanguageType =>
        ALLOWED_LANGUAGES.includes(lang as LanguageType),
    KEY: "language",
} as const;

export type TLanguage = (typeof ALLOWED_LANGUAGES)[number];
