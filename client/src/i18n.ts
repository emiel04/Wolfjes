import type { I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import enLang from "@/locales/en.json";
import nlLang from "@/locales/nl.json";

const i18nOptions: I18nOptions = {
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en: enLang,
        nl: nlLang,
    },
};

export const i18n = createI18n({
    ...i18nOptions,
});
