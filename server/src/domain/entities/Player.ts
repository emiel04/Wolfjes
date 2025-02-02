import { DomainError } from "@domain/errors/DomainError";
import { Guid } from "guid-typescript";
import { name } from "ts-jest/dist/transformers/hoist-jest";

export class Player {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private _isAnonymous: boolean = false
    ) {}

    static createFromAuth(id: string, name: string): Player {
        return new Player(id, name, false);
    }
    static createAnonymous(name: string = "Anonymous"): Player {
        const id = `anon.${Guid.create()}`;
        return new Player(id, name, true);
    }
    public validateState() {
        if (!this._id || !Guid.isGuid(this._id)) {
            throw new DomainError("Invalid GUID for player id");
        }
        if (!this._name || this._name.length < 1) {
            throw new DomainError("Player name must be at least 1 character");
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get isAnonymous(): boolean {
        return this._isAnonymous;
    }
}
