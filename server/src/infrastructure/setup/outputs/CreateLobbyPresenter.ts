import type { OutputPort } from "@application/shared/OutputPort";
import type { Response } from "express";
import { CreateLobbyOutput } from "@application/use-cases/CreateLobbyUseCase";
import { SocketManager } from "@infrastructure/managers/SocketManagerImpl";

export class CreateLobbyPresenter implements OutputPort<CreateLobbyOutput> {
    constructor(
        private readonly response: Response,
        private readonly socketManager: SocketManager,
        private readonly userId: string
    ) {
        this.response = response;
    }

    present(output: CreateLobbyOutput): void {
        this.response.send(output);
        this.socketManager.sendEvent<CreateLobbyOutput>(
            this.userId,
            "game:create",
            output
        );
    }
}
