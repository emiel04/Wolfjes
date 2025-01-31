import type { UserPassword } from "@domain/auth/UserPassword";

export interface SignUpOutputDto {
    id: string;
}
export interface LoginOutputDto {
    id: string;
    token: string;
}

export interface UserPasswordRepository {
    signUp(upw: UserPassword): Promise<SignUpOutputDto>;
    login(): Promise<LoginOutputDto[]>;
}
