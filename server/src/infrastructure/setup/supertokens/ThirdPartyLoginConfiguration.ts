import config from "@helper/config";

export const thirdPartyLoginConfiguration = {
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
};
