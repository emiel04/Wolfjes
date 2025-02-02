import { Lobby } from "@domain/entities/Lobby";
import { LobbyCode } from "@domain/value-objects/LobbyCode";

export interface LobbyRepository {
    create(lobby: Lobby): Promise<void>;
    get(id: LobbyCode): Promise<Lobby | undefined>;
}
