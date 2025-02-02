import type { UseCase } from "@application/shared/UseCase";
import type { OutputPort } from "@application/shared/OutputPort";
import { LobbyRepository } from "@application/repositories/LobbyRepository";
import { LobbyCode } from "@domain/value-objects/LobbyCode";
import { Lobby } from "@domain/entities/Lobby";
import { PlayerRepository } from "@application/repositories/PlayerRepository";
import { DomainError } from "@domain/errors/DomainError";

export interface CreateLobbyOutput {
    gameCode: string;
}

export interface CreateLobbyInput {
    creatorId: string;
}

export class CreateLobbyUseCase implements UseCase<CreateLobbyInput> {
    constructor(
        private outputPort: OutputPort<CreateLobbyOutput>,
        private lobbyRepository: LobbyRepository,
        private playerRepository: PlayerRepository
    ) {}

    async execute(input: CreateLobbyInput): Promise<void> {
        const player = await this.playerRepository.get(input.creatorId);
        if (!player) {
            throw new DomainError("Player record not found");
        }

        const uniqueLobbyCode = await this.generateUniqueLobbyCode();
        const lobby = Lobby.create(uniqueLobbyCode, player);
        await this.lobbyRepository.create(lobby);

        this.outputPort.present({ gameCode: uniqueLobbyCode.value });
    }

    private async generateUniqueLobbyCode(): Promise<LobbyCode> {
        let newLobbyCode: LobbyCode;
        let existingLobby: Lobby | undefined;

        do {
            newLobbyCode = LobbyCode.generate();
            existingLobby = await this.lobbyRepository.get(newLobbyCode);
        } while (existingLobby);

        return newLobbyCode;
    }
}
