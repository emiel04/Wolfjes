<script setup lang="ts">
import LanguagePicker from "@/components/shared/LanguagePicker.vue";
</script>

<template>
    <v-bottom-navigation :elevation="0">
        <v-btn :to="{ name: 'home' }"> Home </v-btn>

        <v-btn :to="{ name: 'counter' }"> Counter </v-btn>

        <LanguagePicker></LanguagePicker>
    </v-bottom-navigation>

    <nav></nav>
    <div class="locale-changer"></div>
</template>

<style scoped>
nav {
}
a {
    display: inline-block;
    margin: 0 1rem;
    padding: 1rem;
    text-decoration: none;
    color: #fff;
    background: #2c3e50;
}
.v-btn--selected {
    background: #42b983;
}

.locale-changer select {
    color: white;
    padding: 1rem;
}
</style>
