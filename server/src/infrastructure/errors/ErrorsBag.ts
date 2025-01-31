export class ErrorsBag {
    protected _errors: string[] = [];

    public get errors(): string[] {
        return this._errors;
    }

    public get hasErrors(): boolean {
        return this._errors.length > 0;
    }

    public add(error: string) {
        this._errors.push(error);
    }

    public clear() {
        this._errors = [];
    }
}
