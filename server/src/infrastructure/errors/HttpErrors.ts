import { ApplicationError } from "@domain/errors/ApplicationError";

export class HttpError extends ApplicationError {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, message);
    }
}
export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(404, message);
    }
}
