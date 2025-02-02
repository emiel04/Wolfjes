import { GameSettings } from "@domain/value-objects/GameSettings";
import { DomainError } from "@domain/errors/DomainError";
import { Player } from "@domain/entities/Player";
import { LobbyCode } from "@domain/value-objects/LobbyCode";

export class Lobby {
    constructor(
        private readonly _lobbyCode: LobbyCode,
        private _players: Player[] = [],
        private _status: "day" | "night" | "pre" = "pre",
        private _settings: GameSettings
    ) {}

    static create(
        gameCode: LobbyCode,
        gameSettings: GameSettings = GameSettings.createDefault()
    ) {
        const lobby = new Lobby(gameCode, [], "pre", gameSettings);
        lobby.validateState();
        return lobby;
    }

    public validateState() {
        this.validateGameSettings();
        this.validateStatus();
        this.validateGameCode();
    }

    private validateGameSettings() {
        this._settings.validateState();
    }

    private validateStatus() {
        if (!["day", "night", "pre"].includes(this._status))
            throw new DomainError("Invalid status");
    }

    private validateGameCode() {
        this._lobbyCode.isValidState();
    }

    get lobbyCode(): LobbyCode {
        return this._lobbyCode;
    }

    get players(): Player[] {
        return [...this._players];
    }

    get status(): "day" | "night" | "pre" {
        return this._status;
    }

    get settings(): GameSettings {
        return this._settings;
    }
}
