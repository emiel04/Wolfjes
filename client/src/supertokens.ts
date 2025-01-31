import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";

export interface SupertokensConfig {
    appName: string;
    apiDomain: string;
}

export const initSupertokens = (config: SupertokensConfig) => {
    SuperTokens.init({
        appInfo: {
            appName: config.appName,
            apiDomain: config.apiDomain,
            apiBasePath: "/auth",
        },
        recipeList: [Session.init()],
    });
};
