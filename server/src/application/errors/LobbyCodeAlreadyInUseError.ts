import { ApplicationError } from "@domain/errors/ApplicationError";
import { LobbyCode } from "@domain/value-objects/LobbyCode";

export class LobbyCodeAlreadyInUseError extends ApplicationError {
    constructor(lobbyCode: LobbyCode) {
        super(`Lobby code already in use: ${lobbyCode.value}`);
    }
}
