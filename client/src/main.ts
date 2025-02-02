import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { i18n } from "@/i18n.ts";
import "vuetify/styles";
import vuetify from "@/vuetify.ts";
import { initSupertokens } from "@/supertokens.ts";
import "@mdi/font/css/materialdesignicons.css";

const apiUrl = import.meta.env.VITE_API_DOMAIN;
const appName = import.meta.env.VITE_APP_NAME;

initSupertokens({
    apiDomain: apiUrl,
    appName: appName,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");
