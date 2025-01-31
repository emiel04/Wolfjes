import type { UseCase } from "@application/shared/UseCase";
import type { OutputPort } from "@application/shared/OutputPort";
import type { SignUpInput } from "@application/input/SignUpInput";
import type { UserPasswordRepository } from "@application/repositories/UserPasswordRepository";
import { UserPassword } from "@domain/auth/UserPassword";
import { DomainError } from "@domain/errors/DomainError";
import logger from "@infrastructure/setup/helper/Logger";
import { SupabaseSignUpError } from "@infrastructure/errors/SupabaseError";

export interface SignUpOutput {
    data: object | null;
    error: string;
}

export class SignUpUseCase implements UseCase<SignUpInput> {
    constructor(
        private outputPort: OutputPort<SignUpOutput>,
        private authRepository: UserPasswordRepository
    ) {}

    async execute(input: SignUpInput): Promise<void> {
        let upw = null;

        try {
            upw = UserPassword.create(
                input.email,
                input.username,
                input.password
            );
            const result = await this.authRepository.signUp(upw);
            this.outputPort.present({ data: result, error: "" });
        } catch (e) {
            if (e instanceof DomainError || e instanceof SupabaseSignUpError) {
                this.outputPort.present({ data: null, error: e.message });
            } else {
                console.error("Unknown error:", e);
                this.outputPort.present({
                    data: null,
                    error: "An unknown error occurred",
                });
            }
        }
    }
}
