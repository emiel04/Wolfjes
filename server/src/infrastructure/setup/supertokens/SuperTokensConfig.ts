import type { TypeInput } from "supertokens-node/types";
import config from "@helper/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";

export const SuperTokensConfig: TypeInput = {
    framework: "express",
    supertokens: {
        connectionURI: config.auth.supertokens.url,
    },
    appInfo: {
        appName: "Wolfjes",
        apiDomain: config.apiDomain,
        websiteDomain: config.websiteDomain,
    },
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [
                                {
                                    clientId:
                                        config.auth.supertokens.providers.google
                                            .clientId,
                                    clientSecret:
                                        config.auth.supertokens.providers.google
                                            .clientSecret,
                                },
                            ],
                        },
                    },
                ],
            },
        }),
        Session.init(),
    ],
};
