import { SMTPService as EmailVerificationSMTPService } from "supertokens-node/recipe/emailverification/emaildelivery";

const smtpSettings = {
    host: "...",
    authUsername: "...",
    password: "...",
    port: 465,
    from: {
        name: "...",
        email: "...",
    },
    secure: true,
};
