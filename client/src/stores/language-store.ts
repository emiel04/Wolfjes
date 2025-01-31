import { defineStore } from "pinia";
import { useLocale } from "vuetify";
import { i18n } from "@/i18n.ts";
import { computed, ref } from "vue";
export type Language = "en" | "nl";

export const useLanguageStore = defineStore("language", () => {
    const language = ref<Language>("en");

    if (localStorage.getItem("lang")) {
        language.value = (localStorage.getItem("lang") as Language) || "en";
    }

    const currentLanguage = computed(() => language.value);
    const { current: vuetifyLocale } = useLocale();

    function setLanguage(lang: Language) {
        language.value = lang;
        vuetifyLocale.value = lang;
        i18n.global.locale = lang;
        localStorage.setItem("lang", lang);
    }

    return { language: currentLanguage, setLanguage };
});
