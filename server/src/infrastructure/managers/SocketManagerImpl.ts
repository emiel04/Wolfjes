import type { Socket } from "socket.io";
import logger from "@infrastructure/setup/helper/Logger";

export interface SocketManager {
    userSockets: Map<string, Socket[]>;

    addSocket(userId: string, socket: Socket): void;

    removeSocket(userId: string, socket: Socket): void;

    sendEvent<T>(userId: string, event: string, payload: T): boolean;

    getSockets(userId: string): Socket[];
}

export class SocketManagerImpl implements SocketManager {
    private static instance: SocketManagerImpl; // TODO make not singleton and also make interface of it
    userSockets: Map<string, Socket[]> = new Map();

    private constructor() {}

    public static getInstance(): SocketManager {
        if (!SocketManagerImpl.instance) {
            SocketManagerImpl.instance = new SocketManagerImpl();
        }
        return SocketManagerImpl.instance;
    }

    addSocket(userId: string, socket: Socket): void {
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, []);
        }

        const sockets = this.userSockets.get(userId)!;
        sockets.push(socket);

        socket.on("disconnect", () => this.removeSocket(userId, socket));

        logger.info(`User ${userId} connected with socket ${socket.id}`);
    }

    removeSocket(userId: string, socket: Socket): void {
        const sockets = this.userSockets.get(userId);
        if (!sockets) return;

        const index = sockets.indexOf(socket);
        if (index > -1) {
            sockets.splice(index, 1);
            logger.info(`Removed socket ${socket.id} for user ${userId}`);

            if (sockets.length === 0) {
                this.userSockets.delete(userId);
            }
        }
    }

    sendEvent<T>(userId: string, event: string, payload: T): boolean {
        const sockets = this.userSockets.get(userId);
        if (!sockets || sockets.length === 0) {
            logger.warn(`No active sockets found for user ${userId}`);
            return false;
        }

        sockets.forEach((socket) => {
            try {
                socket.emit(event, payload);
            } catch (error) {
                logger.error(`Error sending event to user ${userId}:`, error);
            }
        });

        return true;
    }

    getSockets(userId: string): Socket[] {
        return this.userSockets.get(userId) || [];
    }
}
