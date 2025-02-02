<script setup lang="ts">
import { useCounterStore } from "@/stores/counter.ts";
import { useI18n } from "vue-i18n";
import StartComponent from "@/components/StartComponent.vue";
import HealthCheck from "@/components/HealthCheck.vue";
const { t } = useI18n();
const count = useCounterStore();
</script>

<template>
    <main>
        <h2>{{ t("home.welcome", { user: "Emiel" }) }}</h2>
        <v-btn @click="count.increment()"
            >{{ t("login.login-action") }} {{ count.count }}</v-btn
        >
        <StartComponent></StartComponent>
        <HealthCheck />
    </main>
</template>
<style scoped>
.status-message {
    max-width: 20rem;
}
</style>
