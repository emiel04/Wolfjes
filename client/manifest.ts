import { ManifestOptions } from "vite-plugin-pwa";

export const manifest: Partial<ManifestOptions> = {
    name: "Template",
    short_name: "Template",
    theme_color: "#94DEA5",
    icons: [
        {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
        },
        {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
        },
        {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
        },
    ],
};
