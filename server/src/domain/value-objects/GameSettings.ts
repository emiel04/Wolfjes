import { DomainError } from "@domain/errors/DomainError";

export class GameSettings {
    constructor(
        private readonly _roles: string[],
        private readonly _discussionTimeSec: number
    ) {}

    static createDefault(): GameSettings {
        return GameSettings.create(["werewolf", "villager"], 30);
    }

    public validateState() {
        this.ensureMinimumRoles();
    }
    static create(roles: string[], discussionTimeSec: number) {
        const settings = new GameSettings(roles, discussionTimeSec);
        settings.validateState();
        return settings;
    }

    equals(other: GameSettings): boolean {
        return (
            this._discussionTimeSec === other._discussionTimeSec &&
            arraysEqual(this._roles, other._roles)
        );
    }

    private ensureMinimumRoles() {
        if (!this._roles.includes("werewolf")) {
            throw new DomainError("Must include werewolf role");
        }
    }

    get roles(): string[] {
        return [...this._roles];
    }

    get discussionTimeSec(): number {
        return this._discussionTimeSec;
    }
}

function arraysEqual(a: any[], b: any[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}
