import type { TypeInput } from "supertokens-node/types";
import config from "@helper/config";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import { thirdPartyLoginConfiguration } from "@infrastructure/setup/supertokens/ThirdPartyLoginConfiguration";
import {
    emailPasswordOptions,
    emailVerificationRecipeOptions,
} from "@infrastructure/setup/supertokens/SmtpSettings";
import EmailVerification from "supertokens-node/recipe/emailverification";

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
        EmailPassword.init({ ...emailPasswordOptions }),
        EmailVerification.init({ ...emailVerificationRecipeOptions }),
        ThirdParty.init(thirdPartyLoginConfiguration),
        Session.init({
            exposeAccessTokenToFrontendInCookieBasedAuth: true,
        }),
    ],
};
