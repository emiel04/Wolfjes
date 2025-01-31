import { ApplicationError } from "@domain/errors/ApplicationError";

export class EnvironmentError extends ApplicationError {
    constructor(key: string) {
        super(`Missing mandatory environment variable: ${key}`);
    }
}
