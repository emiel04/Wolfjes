<script setup lang="ts">
import { useCounterStore } from "@/stores/counter.ts";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const count = useCounterStore();
</script>

<template>
    <main>
        <h2>{{ t("home.welcome", { user: "Emiel" }) }}</h2>
        <v-btn @click="count.increment()"
            >{{ t("login.login-action") }} {{ count.count }}</v-btn
        >
    </main>
</template>
