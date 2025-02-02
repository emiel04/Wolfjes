import type { OutputPort } from "@application/shared/OutputPort";
import type { Response } from "express";
import { CreateLobbyOutput } from "@application/use-cases/CreateLobbyUseCase";

export class CreateLobbyPresenter implements OutputPort<CreateLobbyOutput> {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    present(output: CreateLobbyOutput): void {
        this.response.send(output);
    }
}
