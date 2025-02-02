import type { Endpoint } from "@infrastructure/shared/endpoint";
import type { Request, Response } from "express";

import { CreateLobbyPresenter } from "@infrastructure/setup/outputs/CreateLobbyPresenter";
import {
    CreateGameController,
    CreateGameRequest,
} from "@infrastructure/controller/Http/CreateGameController";
import { CreateLobbyUseCase } from "@application/use-cases/CreateLobbyUseCase";
import { InMemoryLobbyRepository } from "@infrastructure/repositories/InMemoryLobbyRepository";
import { SuperTokensPlayerRepository } from "@infrastructure/repositories/SuperTokensPlayerRepository";
import { SessionContainer } from "supertokens-node/recipe/session";

export class CreateGameEndpoint implements Endpoint {
    async handle(
        req: Request & { session: SessionContainer },
        res: Response
    ): Promise<void> {
        const outputPort = new CreateLobbyPresenter(res);
        const lobbyRepository = new InMemoryLobbyRepository(); // TODO put somewhere else
        const playerRepository = new SuperTokensPlayerRepository();
        const useCase = new CreateLobbyUseCase(
            outputPort,
            lobbyRepository,
            playerRepository
        );
        const { session } = req;
        const userId = session.getUserId();

        const controller = new CreateGameController(useCase);
        await controller.handle({
            creatorId: userId,
        });

        return Promise.resolve();
    }
}
