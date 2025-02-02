import {
    AuthenticatedEndpoint,
    Endpoint,
} from "@infrastructure/shared/endpoint";
import type { Request, Response } from "express";

import { CreateLobbyPresenter } from "@infrastructure/setup/outputs/CreateLobbyPresenter";
import { CreateGameController } from "@infrastructure/controller/Http/CreateGameController";
import { CreateLobbyUseCase } from "@application/use-cases/CreateLobbyUseCase";
import { InMemoryLobbyRepository } from "@infrastructure/repositories/InMemoryLobbyRepository";
import { SuperTokensPlayerRepository } from "@infrastructure/repositories/SuperTokensPlayerRepository";
import { AuthenticatedRequest } from "@infrastructure/types/AuthenticatedRequest";
import { SocketManagerImpl } from "@infrastructure/managers/SocketManagerImpl";

export class CreateGameEndpoint implements AuthenticatedEndpoint {
    async handle(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { session } = req;
        const userId = session.getUserId();

        const socketManager = SocketManagerImpl.getInstance(); // TODO don't use singleton
        const outputPort = new CreateLobbyPresenter(res, socketManager, userId);
        const lobbyRepository = new InMemoryLobbyRepository();
        const playerRepository = new SuperTokensPlayerRepository();
        const useCase = new CreateLobbyUseCase(
            outputPort,
            lobbyRepository,
            playerRepository
        );

        const controller = new CreateGameController(useCase);
        await controller.handle({
            creatorId: userId,
        });

        return Promise.resolve();
    }
}
