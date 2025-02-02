import { DomainError } from "@domain/errors/DomainError";

export class LobbyCode {
    private static readonly CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    private constructor(private readonly code: string) {}

    public static create(code: string, length: number = 6): LobbyCode {
        if (!this.isValidFormat(code, length)) {
            throw new DomainError("Invalid lobby code format.");
        }
        return new LobbyCode(code.toUpperCase());
    }

    public static generate(length: number = 6): LobbyCode {
        let generatedCode = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * this.CHARSET.length);
            generatedCode += this.CHARSET[randomIndex];
        }
        return this.create(generatedCode, length);
    }

    public static isValidFormat(code: string, length: number = 5): boolean {
        const pattern = new RegExp(`^[${this.CHARSET}]{${length}}$`);
        return pattern.test(code);
    }

    public isValidState() {
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
