import api from "@/helper/axios";
import type { CreateGameReponse } from "@/code/types/Game.ts";

export interface GameService {
    createGame: () => Promise<CreateGameReponse>;
}

const gameService: GameService = {
    async createGame() {
        const response = await api.post<CreateGameReponse>("/games");
        return response.data;
    },
};

export { gameService };
