import { SessionContainer } from "supertokens-node/recipe/session";
import type { Request } from "express";

export type AuthenticatedRequest = Request & { session: SessionContainer };
