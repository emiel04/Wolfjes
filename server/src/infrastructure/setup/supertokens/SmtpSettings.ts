import config from "@helper/config";
import { SMTPService as EmailVerificationSMTPService } from "supertokens-node/recipe/emailverification/emaildelivery";
import { SMTPService } from "supertokens-node/recipe/emailpassword/emaildelivery";
import { TypeInput } from "supertokens-node/types";

const smtpSettings = {
    host: config.smtp.host,
    authUsername: config.smtp.authUsername,
    password: config.smtp.password,
    port: 465,
    from: {
        name: config.smtp.from.name,
        email: config.smtp.from.email,
    },
    secure: true,
};

export const emailPasswordOptions = {
    emailDelivery: {
        service: new SMTPService({ smtpSettings }),
    },
};
export const emailVerificationRecipeOptions = {
    mode: "OPTIONAL" as "OPTIONAL" | "REQUIRED",
    emailDelivery: {
        service: new EmailVerificationSMTPService({ smtpSettings }),
    },
};
