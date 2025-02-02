<script setup lang="ts">
import TestCounter from "@/components/TestCounter.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
    <div>
        <h2>{{ t("counter.main-text") }}</h2>
        <TestCounter></TestCounter>
    </div>
</template>
