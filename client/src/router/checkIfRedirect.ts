/* eslint-disable @typescript-eslint/no-explicit-any */
import Session from "supertokens-web-js/recipe/session";
import config from "@/helper/config.ts";

export async function checkIfRedirect(to: any, from: any, next: any) {
    const sessionExists = await Session.doesSessionExist();
    const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
    if (sessionExists && redirectUrl) {
        console.log("HELLO");

        next(redirectUrl);
        sessionStorage.removeItem("redirectAfterLogin");
    }

    next();
}
