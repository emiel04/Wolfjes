<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t } = useI18n();

const counterStore = useCounterStore();

const counter = computed(() => counterStore.count);

const increment = () => {
    counterStore.increment();
};

defineOptions({ name: "TestCounter" });
</script>

<template>
    <div>
        <h1>{{ t("home.counter-label", { count: counter.toFixed(0) }) }}</h1>
        <v-btn density="default" @click="increment">{{
            t("counter.increment")
        }}</v-btn>
    </div>
</template>
