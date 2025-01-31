import type { NextFunction, Request, Response } from "express";

function errorMiddleware(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) {
    const status = error.status ? error.status : 500;
    const message = status === 500 ? "An unexpected error" : error.message;
    const errors = error.error;
    response.status(status).send({ status, message, error: errors });
}

export default errorMiddleware;
