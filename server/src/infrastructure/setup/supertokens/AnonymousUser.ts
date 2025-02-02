import Session from "supertokens-node/recipe/session";
import { ApplicationError } from "@domain/errors/ApplicationError";
import { Guid } from "guid-typescript";
import { KeyValueObject } from "@helper/types/KeyValueObject";
import { ExpirationHelper } from "@helper/expirationHelper";

export async function createAnonymousJWT(payload: KeyValueObject = {}) {
    const jwtResponse = await Session.createJWT(
        {
            ...payload,
            role: "anonymous",
            sub: `anonymous:${Guid.create().toString()}`,
        },
        ExpirationHelper.getValidityInMillis({ years: 10 })
    ); // 10 years lifetime
    if (jwtResponse.status === "OK") {
        return jwtResponse.jwt;
    }
    throw new ApplicationError("Unable to create JWT");
}
