import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";
import { manifest } from "./manifest";

export default defineConfig(({ mode }): UserConfig => {
    const env = loadEnv(mode, process.cwd());
    const PORT = Number(env.VITE_PORT) ?? 3001;

    return {
        server: {
            port: PORT,
        },
        plugins: [
            vue(),
            vueDevTools(),
            VitePWA({
                registerType: "autoUpdate",
                injectRegister: "script",
                devOptions: {
                    enabled: true,
                    type: "module",
                },
                manifest: manifest,
            }),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
    };
});
