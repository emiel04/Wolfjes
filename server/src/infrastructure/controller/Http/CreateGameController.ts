import type { Controller } from "@infrastructure/shared/controller";
import type { UseCase } from "@application/shared/UseCase";
import { CreateLobbyInput } from "@application/use-cases/CreateLobbyUseCase";

export interface CreateGameRequest {
    creatorId: string;
}

export class CreateGameController implements Controller<CreateGameRequest> {
    constructor(private useCase: UseCase<CreateLobbyInput>) {}
    async handle(request: CreateGameRequest): Promise<void> {
        await this.useCase.execute(request);
    }
}
