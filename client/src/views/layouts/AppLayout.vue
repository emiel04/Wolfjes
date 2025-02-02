<template>
    <router-view v-slot="{ Component }">
        <transition name="slide-x" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
    <NavBar />
</template>

<script setup lang="ts">
import NavBar from "@/components/shared/NavBar.vue";
import { useRouter } from "vue-router";
import Session from "supertokens-web-js/recipe/session";
import { useSocketStore } from "@/stores/socket.ts";
import { onMounted, watch, watchEffect } from "vue";
import { toast } from "vue-sonner";
import config from "@/helper/config.ts";
import api from "@/helper/axios.ts";
import { toRef } from "vue";

const router = useRouter();
const socketStore = useSocketStore();
import { useSocketListener } from "@/composables/useSocketListener";

const initGuestSession = async () => {
    try {
        const existingJwt = localStorage.getItem("guest_jwt");
        if (!existingJwt) {
            const response = await api.get<any>("/auth/guest"); // TODO fix any
            const token = response.data.token;

            if (!token) {
                throw new Error("Missing token in response");
            }

            localStorage.setItem("guest_jwt", token);
        }

        const jwt = existingJwt || localStorage.getItem("guest_jwt")!;
        socketStore.connect(config.apiDomain, jwt, true);
    } catch (error) {
        toast.error("Failed to initialize guest session");
        console.error(error);
    }
};

onMounted(async () => {
    try {
        const sessionExists = await Session.doesSessionExist();
        const accessToken = await Session.getAccessToken();
        if (sessionExists && accessToken) {
            socketStore.connect(config.apiDomain, accessToken, false);
        } else {
            await initGuestSession();
        }
    } catch (error) {
        toast.error("Initialization error");
        console.error(error);
    }
});

useSocketListener<string>(toRef(socketStore, "socket"), "alert", (message) =>
    toast.info(message),
);

useSocketListener<string>(toRef(socketStore, "socket"), "error", (error) =>
    toast.error(error),
);
</script>

<style>
main {
    max-width: 90%;
}
</style>
