import type { UseCase } from "@application/shared/UseCase";
import type { OutputPort } from "@application/shared/OutputPort";

export interface CreateLobbyOutput {
    gameCode: string;
}

export interface CreateLobbyInput {
    creatorId: string;
}

export class CreateLobbyUseCase implements UseCase<CreateLobbyInput> {
    private outputPort: OutputPort<CreateLobbyOutput>;

    constructor(outputPort: OutputPort<CreateLobbyOutput>) {
        this.outputPort = outputPort;
    }

    async execute(): Promise<void> {
        this.outputPort.present({
            gameCode: "1234567890",
        });
        return Promise.resolve();
    }
}
