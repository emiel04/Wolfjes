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
import Session from "supertokens-web-js/recipe/session";

const router = useRouter();

async function checkSession() {
    const sessionExists = await Session.doesSessionExist();
    if (!sessionExists) {
        await router.push("/auth");
    }
}

checkSession();
</script>

<style>
main {
    max-width: 90%;
}
</style>
