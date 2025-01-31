import type { Endpoint } from "@infrastructure/shared/endpoint";
import type { Request, Response } from "express";
import { SignUpPresenter } from "@infrastructure/setup/outputs/SignUpPresenter";
import { SignUpUseCase } from "@application/use-cases/auth/SignUpUseCase";
import type { UserPasswordRepository } from "@application/repositories/UserPasswordRepository";
import { SupabaseUserPasswordRepository } from "@infrastructure/repositories/SupabaseUserPasswordRepository";
import {
    SignUpController,
    type SignUpRequest,
} from "@infrastructure/controller/Http/SignUpController";
import { ErrorsBag } from "@infrastructure/errors/ErrorsBag";

export class SignUpEndpoint implements Endpoint {
    private readonly _errorsBag = new ErrorsBag();

    async handle(req: Request, res: Response): Promise<void> {
        const request = await this.buildRequest(req);

        this.validateRequest(request);

        if (this._errorsBag.hasErrors) {
            res.status(400).json({ errors: this._errorsBag.errors });
            return;
        }

        const presenter = new SignUpPresenter(res);
        const repository: UserPasswordRepository =
            new SupabaseUserPasswordRepository();
        const useCase = new SignUpUseCase(presenter, repository);
        const controller = new SignUpController(useCase);

        await controller.handle(request);

        return Promise.resolve();
    }

    private async buildRequest(req: Request) {
        return req.body as SignUpRequest;
    }

    private validateRequest(request: SignUpRequest) {
        this._errorsBag.clear();

        if (!request.email) {
            this._errorsBag.add("Email is missing");
        }

        if (!request.password) {
            this._errorsBag.add("Password is missing");
        }

        if (!request.username) {
            this._errorsBag.add("Username is missing");
        }
    }
}
