<template>
    <div>
        <NavBar />
        <main>
            <router-view v-slot="{ Component }">
                <transition name="slide-x" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/shared/NavBar.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import Session from "supertokens-web-js/recipe/session";
const router = useRouter();

onMounted(async () => {
    const sessionExists = await Session.doesSessionExist();
    if (sessionExists) {
        const redirectUrl = sessionStorage.getItem("redirectAfterLogin");

        if (redirectUrl) {
            await router.push(redirectUrl);
            sessionStorage.removeItem("redirectAfterLogin");
        } else {
            await router.push("/");
        }
    }
});
</script>

<style>
main {
    max-width: 90%;
}
</style>
