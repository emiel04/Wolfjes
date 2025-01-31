import { DomainError } from "@domain/errors/DomainError";
import { check } from "ts-patch";
import config from "@helper/config";

export class UserPassword {
    constructor(
        private readonly _email: string,
        private readonly _username: string,
        private readonly _password: string
    ) {}

    static create(
        email: string,
        username: string,
        password: string
    ): UserPassword {
        const upw = new UserPassword(email, username, password);
        upw.validateState();
        return upw;
    }

    public validateState() {
        this.ensureEmail();
        this.ensurePassword();
        this.ensureUsername();
    }

    private ensureEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._email)) {
            throw new DomainError("Email must be a valid email");
        }
    }

    private ensurePassword() {
        if (
            this._password.length < config.auth.minimumPasswordLength ||
            this._password.length > config.auth.maximumPasswordLength
        ) {
            throw new DomainError(
                `Password must be between ${config.auth.minimumPasswordLength} and ${config.auth.maximumPasswordLength} characters long`
            );
        }
        if (
            config.auth.mandatoryPasswordUpperCase &&
            !/[A-Z]/.test(this._password)
        ) {
            throw new DomainError(
                "Password must contain at least one uppercase letter"
            );
        }
        if (
            config.auth.mandatoryPasswordDigit &&
            !/[0-9]/.test(this._password)
        ) {
            throw new DomainError("Password must contain at least one digit");
        }
        if (
            config.auth.mandatoryPasswordSpecialCharacter &&
            !/[!@#$%^&*(),.?":{}|<>]/.test(this._password)
        ) {
            throw new DomainError(
                "Password must contain at least one special character"
            );
        }
    }

    private ensureUsername() {
        if (
            this._username.length < config.auth.minimumUsernameLength ||
            this._username.length > config.auth.maximumUsernameLength
        ) {
            throw new DomainError(
                `Username must be between ${config.auth.minimumUsernameLength} and ${config.auth.maximumUsernameLength} characters long`
            );
        }
        if (!/^[a-zA-Z0-9_]+$/.test(this._username)) {
            throw new DomainError(
                "Username can only contain letters, numbers, and underscores"
            );
        }
    }

    get email(): string {
        return this._email;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }
}
