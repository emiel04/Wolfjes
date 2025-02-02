/* eslint-disable @typescript-eslint/no-explicit-any */
import Session from "supertokens-web-js/recipe/session";

export async function secureGuard(to: any, from: any, next: any) {
    const sessionExists = await Session.doesSessionExist();
    if (sessionExists) {
        next();
    } else {
        sessionStorage.setItem("redirectAfterLogin", to.fullPath); // TODO better way of redirecting after login.
        next("/auth");
    }
}
