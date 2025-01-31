import { ApplicationError } from "@domain/errors/ApplicationError";

export class SupabaseError extends ApplicationError {
    constructor(message: string) {
        super(message);
    }
}

export class SupabaseSignUpError extends ApplicationError {
    constructor(reason: string) {
        super(reason);
    }
}
