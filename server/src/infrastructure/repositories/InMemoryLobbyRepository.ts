import { LobbyRepository } from "@application/repositories/LobbyRepository";
import { Lobby } from "@domain/entities/Lobby";
import { LobbyCode } from "@domain/value-objects/LobbyCode";

export class InMemoryLobbyRepository implements LobbyRepository {
    // TODO make use of redis?
    private lobbies = new Map<string, Lobby>();

    async create(lobby: Lobby): Promise<void> {
        this.lobbies.set(lobby.lobbyCode.value, lobby);
    }

    async get(lobbyCode: LobbyCode): Promise<Lobby | undefined> {
        return this.lobbies.get(lobbyCode.value);
    }
}
