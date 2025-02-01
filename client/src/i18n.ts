import type { I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import enLang from "@/locales/en.json";
import nlLang from "@/locales/nl.json";
import { Language, type TLanguage } from "@/helper/language.ts";

const initialLanguage = Language.is(localStorage.getItem(Language.KEY))
    ? (localStorage.getItem(Language.KEY) as TLanguage)
    : "en";

const i18nOptions: I18nOptions = {
    legacy: false,
    locale: initialLanguage,
    fallbackLocale: "en",
    messages: {
        en: enLang,
        nl: nlLang,
    },
};

export const i18n = createI18n({
    ...i18nOptions,
});
