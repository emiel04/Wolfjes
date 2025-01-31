import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/views/layouts/AppLayout.vue";
import CounterView from "@/views/CounterView.vue";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/auth/AuthView.vue";
import PublicLayout from "@/views/layouts/PublicLayout.vue";

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
                },
                {
                    path: "counter",
                    name: "counter",
                    component: CounterView,
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

export default router;
