import { DomainError } from "@domain/errors/DomainError";

export class LobbyCode {
    private static readonly CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static readonly LENGTH = 6;
    private constructor(private readonly code: string) {}

    public static create(code: string): LobbyCode {
        const lobbyCode = new LobbyCode(code);
        lobbyCode.validateState();
        return new LobbyCode(code.toUpperCase());
    }

    public static generate(): LobbyCode {
        let generatedCode = "";
        for (let i = 0; i < this.LENGTH; i++) {
            const randomIndex = Math.floor(Math.random() * this.CHARSET.length);
            generatedCode += this.CHARSET[randomIndex];
        }
        return this.create(generatedCode);
    }

    public static isValidFormat(code: string): boolean {
        const pattern = new RegExp(`^[${this.CHARSET}]{${this.LENGTH}}$`);
        return pattern.test(code);
    }

    public validateState() {
        const isValid = LobbyCode.isValidFormat(this.code);
        if (!isValid) {
            throw new DomainError("Invalid lobby code format.");
        }
        return;
    }

    public get value(): string {
        return this.code;
    }

    toString() {
        return this.value;
    }
}
