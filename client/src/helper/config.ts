const config = {
    port: Number(import.meta.env.VITE_PORT) || 3001,
    apiDomain:
        import.meta.env.VITE_API_DOMAIN ||
        (() => {
            throw new Error("VITE_API_DOMAIN");
        })(),
    websiteDomain:
        import.meta.env.VITE_WEBSITE_DOMAIN ||
        (() => {
            throw new Error("VITE_WEBSITE_DOMAIN");
        })(),
    appName: import.meta.env.VITE_APP_NAME || "My app",
};

export default config;
