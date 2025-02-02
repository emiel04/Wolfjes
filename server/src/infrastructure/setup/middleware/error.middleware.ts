import type { NextFunction, Request, Response } from "express";
import { DomainError } from "@domain/errors/DomainError";
import logger from "@infrastructure/setup/helper/Logger";
import { HttpError } from "@infrastructure/errors/HttpErrors";

function errorMiddleware(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (error instanceof DomainError) {
        response.status(400).send({ status: 400, error: error.message });
        return;
    } else if (error instanceof HttpError) {
        response
            .status(error.statusCode)
            .send({ status: error.statusCode, error: error.message });
        return;
    }

    logger.error(error, error.stack);

    const status = error.status ? error.status : 500;
    const message = status === 500 ? "An unexpected error" : error.message;
    const errors = error.error;
    response.status(status).send({ status, message, error: errors });
}

export default errorMiddleware;
