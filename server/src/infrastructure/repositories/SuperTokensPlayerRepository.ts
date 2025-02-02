import { PlayerRepository } from "@application/repositories/PlayerRepository";
import { Player } from "@domain/entities/Player";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import supertokens from "supertokens-node";
import { PlayerProfile } from "@domain/value-objects/PlayerProfile";

export class SuperTokensPlayerRepository implements PlayerRepository {
    async create(player: Player): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async get(id: string): Promise<Player | undefined> {
        const userInfo = await supertokens.getUser(id);

        if (!userInfo) return;

        const metadata = await UserMetadata.getUserMetadata(id);
        const profile = metadata.metadata.profile as PlayerProfile;
        profile.name = profile.name
            ? profile.name
            : `User ${Math.floor(Math.random() * 9) + 1}`;

        return Player.createFromAuth(id, profile.name);
    }
}
