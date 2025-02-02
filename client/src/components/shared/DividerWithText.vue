<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <v-container>
        <v-row wrap no-gutters>
            <v-col cols="5" class="text-center">
                <v-divider class="mt-3" />
            </v-col>
            <v-col cols="2" class="text-center divider-text">
                {{ props.text }}
            </v-col>
            <v-col cols="5" class="text-center">
                <v-divider class="mt-3" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.divider-text {
    opacity: calc(var(--v-border-opacity) * 2);
}
</style>
