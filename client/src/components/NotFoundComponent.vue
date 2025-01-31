<script lang="ts">
import { defineComponent } from "vue";
import notFoundError from "@/assets/media/not-found-error.svg";
export default defineComponent({
    name: "NotFoundComponent",
    data() {
        return {
            notFoundError,
        };
    },
});
</script>

<template>
    <img :src="notFoundError" alt="Not found" />
</template>

<style scoped>
img {
    width: 100%;
}
</style>
