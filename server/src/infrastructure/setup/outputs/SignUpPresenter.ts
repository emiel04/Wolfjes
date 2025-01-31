import type { OutputPort } from "@application/shared/OutputPort";
import type { Response } from "express";
import type { SignUpOutput } from "@application/use-cases/auth/SignUpUseCase";

export class SignUpPresenter implements OutputPort<SignUpOutput> {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    present(output: SignUpOutput): void {
        this.response.send(output);
    }
}
