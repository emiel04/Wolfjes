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
    <v-bottom-navigation :elevation="0">
        <v-btn :to="{ name: 'home' }"> Home </v-btn>

        <v-btn :to="{ name: 'counter' }"> Counter </v-btn>

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
    </v-bottom-navigation>

    <nav></nav>
    <div class="locale-changer"></div>
</template>

<style scoped>
nav {
}
a {
    display: inline-block;
    margin: 0 1rem;
    padding: 1rem;
    text-decoration: none;
    color: #fff;
    background: #2c3e50;
}
.v-btn--selected {
    background: #42b983;
}

.locale-changer select {
    color: white;
    padding: 1rem;
}
</style>
