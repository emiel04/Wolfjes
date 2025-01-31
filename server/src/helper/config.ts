import dotenv from "dotenv";
import { boolean } from "boolean";
import { EnvironmentError } from "@domain/errors/EnvironmentError";
import * as process from "node:process";

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 3000,
    enableConnectionStateRecovery:
        boolean(process.env.ENABLE_CONNECTION_STATE_RECOVERY) || false,
    connectionStateRecoveryDuration:
        Number(process.env.CONNECTION_STATE_RECOVERY_DURATION) || 5000,
    jwtSecret:
        process.env.JWT_SECRET ||
        (() => {
            throw new EnvironmentError("JWT_SECRET");
        })(),
    supabaseKey:
        process.env.SUPABASE_KEY ||
        (() => {
            throw new EnvironmentError("SUPABASE_KEY");
        })(),
    supabaseUrl:
        process.env.SUPABASE_URL ||
        (() => {
            throw new EnvironmentError("SUPABASE_URL");
        })(),
    apiDomain:
        process.env.API_DOMAIN ||
        (() => {
            throw new EnvironmentError("API_DOMAIN");
        })(),
    websiteDomain:
        process.env.WEBSITE_DOMAIN ||
        (() => {
            throw new EnvironmentError("WEBSITE_DOMAIN");
        })(),
    auth: {
        minimumUsernameLength: Number(process.env.MIN_USERNAME_LENGTH) || 3,
        maximumUsernameLength: Number(process.env.MAX_USERNAME_LENGTH) || 20,
        minimumPasswordLength: Number(process.env.MIN_PASSWORD_LENGTH) || 8,
        maximumPasswordLength: Number(process.env.MAX_PASSWORD_LENGTH) || 20,
        mandatoryPasswordDigit:
            boolean(process.env.REQUIRE_PASSWORD_DIGIT) || false,
        mandatoryPasswordUpperCase:
            boolean(process.env.REQUIRE_PASSWORD_UPPERCASE) || false,
        mandatoryPasswordSpecialCharacter:
            boolean(process.env.REQUIRE_PASSWORD_SPECIAL) || false,
        supertokens: {
            url:
                process.env.SUPERTOKENS_URL ||
                (() => {
                    throw new EnvironmentError("SUPERTOKENS_URL");
                })(),
            providers: {
                google: {
                    clientId:
                        process.env.GOOGLE_CLIENT_ID ||
                        (() => {
                            throw new EnvironmentError("GOOGLE_CLIENT_ID");
                        })(),
                    clientSecret:
                        process.env.GOOGLE_CLIENT_SECRET ||
                        (() => {
                            throw new EnvironmentError("GOOGLE_CLIENT_SECRET");
                        })(),
                },
            },
        },
    },
};

export default config;
