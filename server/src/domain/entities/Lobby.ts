import { GameSettings } from "@domain/value-objects/GameSettings";
import { DomainError } from "@domain/errors/DomainError";
import { Player } from "@domain/entities/Player";
import { LobbyCode } from "@domain/value-objects/LobbyCode";
import { Guid } from "guid-typescript";

export class Lobby {
    constructor(
        private readonly _lobbyCode: LobbyCode,
        private readonly _creator: Player,
        private _players: Player[] = [],
        private _status: "day" | "night" | "pre" = "pre",
        private _settings: GameSettings
    ) {}

    static create(
        gameCode: LobbyCode,
        creator: Player,
        gameSettings: GameSettings = GameSettings.createDefault()
    ) {
        const lobby = new Lobby(gameCode, creator, [], "pre", gameSettings);
        lobby.validateState();
        return lobby;
    }

    public validateState() {
        this.validateGameSettings();
        this.validateStatus();
        this.validateGameCode();
        this.validateCreator();
    }

    private validateGameSettings() {
        this._settings.validateState();
    }

    private validateStatus() {
        if (!["day", "night", "pre"].includes(this._status))
            throw new DomainError("Invalid status");
    }

    private validateGameCode() {
        this._lobbyCode.validateState();
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

    private validateCreator() {
        if (!this._creator.id || !Guid.isGuid(this._creator.id))
            throw new DomainError("Not a valid GUID for creator");
        if (!this._creator.name || this._creator.name.length < 1)
            throw new DomainError("Creator name must be at least 1 character");
    }
}
