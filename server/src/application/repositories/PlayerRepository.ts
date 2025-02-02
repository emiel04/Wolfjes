import { Player } from "@domain/entities/Player";

export interface PlayerRepository {
    create(player: Player): Promise<void>;
    get(id: string): Promise<Player | undefined>;
}
