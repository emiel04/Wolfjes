<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { defineComponent, onMounted, onUnmounted } from "vue";
import config from "@/helper/config.ts";
export default defineComponent({
    setup() {
        const loadScript = (src: string) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = src;
            script.id = "supertokens-script";
            script.onload = () => {
                (window as any).supertokensUIInit("supertokensui", {
                    appInfo: {
                        appName: config.appName,
                        apiDomain: config.apiDomain,
                        websiteDomain: config.websiteDomain,
                        apiBasePath: "/auth",
                        websiteBasePath: "/auth",
                    },
                    recipeList: [
                        (window as any).supertokensUIEmailPassword.init(),
                        (window as any).supertokensUIThirdParty.init({
                            signInAndUpFeature: {
                                providers: [
                                    (
                                        window as any
                                    ).supertokensUIThirdParty.Google.init(),
                                ],
                            },
                        }),
                        (window as any).supertokensUISession.init(),
                    ],
                });
            };
            document.body.appendChild(script);
        };

        onMounted(() => {
            loadScript(
                "https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v0.47.0/build/static/js/main.00ec3e91.js",
            );
        });

        onUnmounted(() => {
            const script = document.getElementById("supertokens-script");
            if (script) {
                script.remove();
            }
        });
    },
});
</script>
<template>
    <div id="supertokensui" />
</template>
<style scoped>
#supertokensui ::part[data-supertokens="superTokensBranding"] {
    display: none;
}
</style>
