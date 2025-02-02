import type { Endpoint } from "@infrastructure/shared/endpoint";
import type { Request, Response } from "express";
import { HealthPresenter } from "@infrastructure/setup/outputs/HealthPresenter";
import { HealthUseCase } from "@application/use-cases/HealthUseCase";
import { HealthController } from "@infrastructure/controller/Http/HealthController";

export class CreateGameEndpoint implements Endpoint {
    async handle(req: Request, res: Response): Promise<void> {
        const outputPort = new HealthPresenter(res);
        await controller.handle();

        return Promise.resolve();
    }
}
