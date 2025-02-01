import { defineStore } from "pinia";
import { ref } from "vue";
import Session from "supertokens-web-js/recipe/session";

export type TAuthStore = {
    isLoggedIn: boolean;
    checkSession: () => Promise<void>;
};

export const useAuthStore = defineStore("auth", () => {
    const isLoggedIn = ref(false);

    const checkSession = async () => {
        isLoggedIn.value = await Session.doesSessionExist();
    };

    checkSession().then();

    return { isLoggedIn, checkSession };
});
