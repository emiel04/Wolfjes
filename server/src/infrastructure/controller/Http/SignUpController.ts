import type { Controller } from "@infrastructure/shared/controller";
import type { SignUpInput } from "@application/input/SignUpInput";
import type { UseCase } from "@application/shared/UseCase";

export interface SignUpRequest {
    email: string;
    username: string;
    password: string;
}

export class SignUpController implements Controller<SignUpRequest> {
    constructor(private useCase: UseCase<SignUpInput>) {}

    async handle(request: SignUpRequest): Promise<void> {
        await this.useCase.execute(request);
    }
}
