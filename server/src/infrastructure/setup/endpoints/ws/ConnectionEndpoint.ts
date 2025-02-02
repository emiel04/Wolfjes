import type { WSEndpoint } from "@infrastructure/shared/WSEndpoint";
import type { Socket } from "socket.io";
import { Guid } from "guid-typescript";
import logger from "@infrastructure/setup/helper/Logger";
import { UnauthenticatedError } from "@domain/errors/UnauthenticatedError";
import Session from "supertokens-node/recipe/session";
import { SocketManagerImpl } from "@infrastructure/managers/SocketManagerImpl";

export class ConnectionEndpoint implements WSEndpoint {
    private socketManager = SocketManagerImpl.getInstance();

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
            this.socketManager.addSocket(userId, socket);

            socket.send("alert", "You are now logged in");
        } catch (_) {
            throw new UnauthenticatedError();
        }

        // TODO authenication
        // TODO do something with connection (call controller?)
    }

    private handleAnonymous(socket: Socket) {
        const id = `anon.${Guid.create()}`;
        this.socketManager.addSocket(id, socket);

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
