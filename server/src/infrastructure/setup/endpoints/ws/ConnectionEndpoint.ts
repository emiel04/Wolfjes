import type { WSEndpoint } from "@infrastructure/shared/WSEndpoint";
import type { Socket } from "socket.io";
import { Guid } from "guid-typescript";
import logger from "@infrastructure/setup/helper/Logger";
import { UnauthenticatedError } from "@domain/errors/UnauthenticatedError";
import Session from "supertokens-node/recipe/session";
import { ApplicationError } from "@domain/errors/ApplicationError";
import { UnauthorizedError } from "@domain/errors/UnauthorizedError";

export class ConnectionEndpoint implements WSEndpoint {
    async handle(socket: Socket): Promise<void> {
        logger.info(
            `New websocket connection from ${socket.handshake.address} with id ${socket.id}`
        );

        const token = socket.handshake.query.token as string;
        const guestToken = socket.handshake.query.guestToken as string;

        if (token) {
            await this.handleAuth(socket, token);
            return;
        }
        // Anonymous session
        this.handleAnonymous(socket);
    }

    private async handleAuth(socket: Socket, token: string) {
        try {
            const session =
                await Session.getSessionWithoutRequestResponse(token);
            const userId = session.getUserId();
            socket.send("alert", "You are now logged in");
        } catch (_) {
            throw new UnauthenticatedError();
        }

        // TODO authenication
        // TODO do something with connection (call controller?)
    }

    private handleAnonymous(socket: Socket) {
        const id = `anon.${Guid.create()}`;

        // Now there is an anonymous things,
        socket.emit(
            "alert",
            JSON.stringify({
                type: "anonymous",
                id: id,
            })
        );
        // for example, quit
        // TODO do something with connection (call controller?)
    }
}
