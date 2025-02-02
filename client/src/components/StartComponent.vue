<script setup lang="ts">
import { useI18n } from "vue-i18n";
import DividerWithText from "@/components/shared/DividerWithText.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore.ts";

const { t } = useI18n();
const authStore = useAuthStore();

function createGame() {
    router.push("/create-game");
}
</script>

<template>
    <div class="start-component">
        <h1 class="font-weight-bold title">
            {{ t("start.title") }}
        </h1>
        <div class="code-container">
            <v-btn prepend-icon="mdi-qrcode-scan" size="large" class="mb-5">{{
                t("start.scan-code")
            }}</v-btn>
            <span class="code-input">
                <v-text-field
                    variant="filled"
                    clearable
                    :label="t('start.code-textfield')"
                    :placeholder="t('start.code-placeholder')"
                    prepend-icon="mdi-keyboard"
                    @click:append="
                        () => {
                            console.log('test');
                        }
                    "
                >
                    <template v-slot:append>
                        <v-btn
                            color="primary"
                            icon="mdi-arrow-right-thick"
                            size="large"
                        ></v-btn>
                    </template>
                </v-text-field>
            </span>
            <DividerWithText
                :text="t('start.or')"
                class="mb-4"
            ></DividerWithText>

            <v-menu v-if="!authStore.isLoggedIn">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" size="large" v-bind="props">{{
                        t("start.create-btn")
                    }}</v-btn>
                </template>
                <v-card max-width="200">
                    <v-card-item
                        >You must create an account before starting a game.
                        Continue?</v-card-item
                    >
                    <v-card-actions align="end">
                        <v-spacer></v-spacer>
                        <v-btn variant="flat" color="grey">No</v-btn>
                        <v-btn
                            variant="flat"
                            color="primary"
                            @click="router.push('/auth')"
                            >Yes</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-menu>
            <v-btn v-else size="large" color="primary" @click="createGame">{{
                t("start.create-btn")
            }}</v-btn>
        </div>
    </div>
</template>

<style scoped>
.start-component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.code-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
}

.code-input {
    align-self: stretch;
}
.full-width {
    width: 100%;
}
.title {
    margin-left: 1rem;
    font-size: 2.5rem;
    line-height: 3rem;
    margin-bottom: 1rem;
}
</style>
