<template>
    <router-view />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Session from "supertokens-web-js/recipe/session";
import { onMounted } from "vue";

const router = useRouter();

async function checkSession() {
    const sessionExists = await Session.doesSessionExist();
    if (!sessionExists) {
        await router.push("/auth");
    }
}

onMounted(() => {
    checkSession();
});
</script>
<style></style>
