import { HealthEndpoint } from "./endpoints/HealthEndpoint";
import type { Express, NextFunction, Request, Response } from "express";
import { SignUpEndpoint } from "@infrastructure/setup/endpoints/SignUpEndpoint";
import { verifySession } from "supertokens-node/lib/build/recipe/session/framework/express";

function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}

export function registerRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.json({ hello: "world" });
    });

    app.get(
        "/health",
        asyncHandler(async (req: Request, res: Response) => {
            const endpoint = new HealthEndpoint();
            await endpoint.handle(req, res);
        })
    );

    app.get("/authtest", verifySession(), (req: Request, res: Response) => {
        res.json({ hello: "YOU ARE AUTHENTICATED" });
    });

    app.post(
        "/auth/signup",
        asyncHandler(async (req: Request, res: Response) => {
            const endpoint = new SignUpEndpoint();
            await endpoint.handle(req, res);
        })
    );
}
