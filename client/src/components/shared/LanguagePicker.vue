<script setup lang="ts">
import { ref, watch } from "vue";
import { i18n } from "@/i18n.ts";
import { useLanguageStore } from "@/stores/language-store.ts";

const languageStore = useLanguageStore();

const availableLocales = i18n.global.availableLocales;
const selectedLocale = ref(i18n.global.locale);

watch(selectedLocale, (newLocale) => {
    languageStore.setLanguage(newLocale as "en" | "nl"); // Update the language in the store
});
</script>

<template>
    <div>
        <v-menu location="top">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                    {{ selectedLocale }}
                </v-btn>
            </template>
            <v-list dense value="nearby">
                <v-list-item
                    v-for="locale in availableLocales"
                    :key="`locale-${locale}`"
                    :value="locale"
                    @click="selectedLocale = locale"
                >
                    {{ locale }}
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
