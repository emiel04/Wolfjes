import type { Request, Response } from "express";
import { AuthenticatedRequest } from "@infrastructure/types/AuthenticatedRequest";

export interface Endpoint {
    handle(req: Request, res: Response): Promise<void>;
}
export interface AuthenticatedEndpoint {
    handle(req: AuthenticatedRequest, res: Response): Promise<void>;
}
