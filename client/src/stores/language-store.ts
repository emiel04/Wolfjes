import { defineStore } from "pinia";
import { useLocale } from "vuetify";
import { i18n } from "@/i18n.ts";
import { computed, onMounted, ref } from "vue";
import { type TLanguage, Language } from "@/helper/language.ts";
import {} from "@/helper/language.ts";
export const useLanguageStore = defineStore("language", () => {
    const language = ref<TLanguage>(
        Language.is(localStorage.getItem(Language.KEY))
            ? (localStorage.getItem(Language.KEY) as TLanguage)
            : "nl",
    );

    const { current: vuetifyLocale } = useLocale();

    function setLanguage(lang: TLanguage) {
        if (!Language.is(lang)) return;

        language.value = lang;
        vuetifyLocale.value = lang;
        i18n.global.locale = lang;
        localStorage.setItem(Language.KEY, lang);
    }

    onMounted(() => {
        vuetifyLocale.value = language.value;
        i18n.global.locale = language.value;
    });

    return {
        language: computed(() => language.value),
        setLanguage,
    };
});
