import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/views/layouts/AppLayout.vue";
import CounterView from "@/views/CounterView.vue";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/auth/AuthView.vue";
import PublicLayout from "@/views/layouts/PublicLayout.vue";
import { secureGuard } from "@/router/secureGuard.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import SecureLayout from "@/views/layouts/SecureLayout.vue";
import { checkIfRedirect } from "@/router/checkIfRedirect.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: AppLayout,
            children: [
                {
                    path: "",
                    name: "home",
                    component: HomeView,
                    beforeEnter: checkIfRedirect,
                },
                {
                    path: "counter",
                    name: "counter",
                    beforeEnter: secureGuard,
                    component: CounterView,
                },
            ],
        },
        {
            path: "/",
            component: SecureLayout,
            children: [
                {
                    path: "/create-game",
                    name: "create-game",
                    component: () => import("@/views/secure/CreateGame.vue"),
                },
            ],
        },
        {
            path: "/auth/:pathMatch(.*)*",
            component: PublicLayout,
            children: [
                {
                    path: "",
                    name: "auth",
                    component: AuthView,
                },
            ],
        },
        // {
        //   path: '/auth',
        //   component: PublicLayout,
        //   children: [
        //     {
        //       path: '/login',
        //       name: 'login',
        //       component: () => import('../views/public/Login.vue'),
        //     },
        //   ],
        // },
        // { path: '/:pathMatch(.*)', component: NotFoundComponent },
    ],
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.checkSession();
    next();
});

export default router;
