import type {
    LoginOutputDto,
    SignUpOutputDto,
    UserPasswordRepository,
} from "@application/repositories/UserPasswordRepository";
import type { UserPassword } from "@domain/auth/UserPassword";
import supabase from "@infrastructure/setup/supabase/Supabase";
import {
    SupabaseError,
    SupabaseSignUpError,
} from "@infrastructure/errors/SupabaseError";
import logger from "@infrastructure/setup/helper/Logger";
import type { AuthResponse } from "@supabase/supabase-js";

export class SupabaseUserPasswordRepository implements UserPasswordRepository {
    async signUp(upw: UserPassword): Promise<SignUpOutputDto> {
        let authResponse;
        try {
            authResponse = await supabase.auth.signUp({
                email: upw.email,
                password: upw.password,
            });
        } catch (e) {
            logger.error(e);
            throw new SupabaseSignUpError(
                `An error occurred while signing up: ${e}`
            );
        }

        const user = authResponse.data.user;
        if (!user) {
            throw new SupabaseSignUpError(`${authResponse.error?.message}`);
        }
        console.log(user);

        if (authResponse.error) {
            throw new SupabaseSignUpError(`${authResponse.error?.message}`);
        }

        return {
            id: user.id,
        };
    }

    async login(): Promise<LoginOutputDto[]> {
        return [{ id: "user-id", token: "generated-token" }];
    }
}
