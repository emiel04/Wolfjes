import { HealthEndpoint } from "./endpoints/HealthEndpoint";
import type { Express, NextFunction, Request, Response } from "express";
import { SignUpEndpoint } from "@infrastructure/setup/endpoints/SignUpEndpoint";
import { verifySession } from "supertokens-node/lib/build/recipe/session/framework/express";
import { GuestEndpoint } from "@infrastructure/setup/endpoints/auth/GuestEndpoint";
import { CreateGameEndpoint } from "@infrastructure/setup/endpoints/CreateGameEndpoint";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { BadRequestError } from "@infrastructure/errors/HttpErrors";
import { AuthenticatedRequest } from "@infrastructure/types/AuthenticatedRequest";

function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}

function asyncAuthHandler(
    fn: (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => Promise<void>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req as AuthenticatedRequest, res, next).catch(next);
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

    app.get(
        "/auth/guest",
        asyncHandler(async (req: Request, res: Response) => {
            const endpoint = new GuestEndpoint();
            await endpoint.handle(req, res);
        })
    );

    app.post(
        "/games",
        verifySession(),
        asyncAuthHandler(async (req: AuthenticatedRequest, res: Response) => {
            const endpoint = new CreateGameEndpoint();
            await endpoint.handle(req, res);
        })
    );

    app.put(
        "/profile/name",
        verifySession(),
        asyncAuthHandler(async (req: AuthenticatedRequest, res: Response) => {
            const { session } = req;
            const userId = session.getUserId();

            if (!req.body) {
                throw new BadRequestError("No body");
            }

            const name = req.body.name;
            if (!name) {
                throw new BadRequestError("No name");
            }

            await UserMetadata.updateUserMetadata(userId, {
                profile: { name: name },
            });

            res.json({ message: "successfully updated user metadata" });
        })
    );

    app.get(
        "/profile",
        verifySession(),
        asyncAuthHandler(async (req: AuthenticatedRequest, res: Response) => {
            const { session } = req;
            const userId = session.getUserId();
            const { metadata } = await UserMetadata.getUserMetadata(userId);

            res.json(metadata);
        })
    );
}
