import { Endpoint } from "@infrastructure/shared/endpoint";
import { Request, Response } from "express";
import { createAnonymousJWT } from "@infrastructure/setup/supertokens/AnonymousUser";
import { ExpirationHelper } from "@helper/expirationHelper";
export class GuestEndpoint implements Endpoint {
    async handle(req: Request, res: Response): Promise<void> {
        const token = await createAnonymousJWT();
        const expirationDate = ExpirationHelper.getExpirationDate({
            years: 1,
        });

        res.cookie("guest_token", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expirationDate,
        });
        res.json({ token: token });
    }
}
