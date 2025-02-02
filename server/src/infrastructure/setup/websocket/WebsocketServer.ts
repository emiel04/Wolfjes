import type { Server as HttpServer } from "node:http";
import {
    Server as SocketIOServer,
    type ServerOptions,
    type Socket,
} from "socket.io";
import logger from "@infrastructure/setup/helper/Logger";
import config from "@helper/config";
import { ConnectionEndpoint } from "@infrastructure/setup/endpoints/ws/ConnectionEndpoint";
import { ApplicationError } from "@domain/errors/ApplicationError";
import { UnauthorizedError } from "@domain/errors/UnauthorizedError";
import { UnauthenticatedError } from "@domain/errors/UnauthenticatedError";
import { DomainError } from "@domain/errors/DomainError";
import loggingMiddleware from "@infrastructure/setup/websocket/middleware";

export class WebSocketServer {
    private readonly io: SocketIOServer;

    constructor(httpServer: HttpServer) {
        logger.info("Creating websocket server");
        logger.info(`Allowed origins: ${config.allowedOrigins}`);
        const options: Partial<ServerOptions> = {
            cors: {
                origin: config.allowedOrigins,
                methods: ["GET", "POST"],
                credentials: true,
            },
        };

        if (config.enableConnectionStateRecovery) {
            options.connectionStateRecovery = {
                maxDisconnectionDuration:
                    config.connectionStateRecoveryDuration,
            };
        }

        this.io = new SocketIOServer(httpServer, options);
        this.io.use(loggingMiddleware);
    }

    initialize() {
        logger.info("Initializing websocket server");
        this.registerSocketMessages();
        this.startTimedAlert();
    }

    getIO(): SocketIOServer {
        return this.io;
    }

    private registerSocketMessages() {
        this.io.on(
            "connection",
            this.handleSocketEvent(async (socket: Socket) => {
                const connectionEndpoint = new ConnectionEndpoint();
                await connectionEndpoint.handle(socket);
            })
        );
    }

    private handleSocketEvent(handler: (socket: Socket) => Promise<void>) {
        return async (socket: Socket) => {
            try {
                await handler(socket);
            } catch (e) {
                if (e instanceof ApplicationError) {
                    this.handleError(socket, e);
                } else {
                    logger.error(e);
                    socket.disconnect(); // Unknown error, so disconnect for security reasons.
                }
            }
        };
    }

    private handleError(socket: Socket, e: ApplicationError) {
        if (e instanceof UnauthorizedError) {
            socket.emit("errors", "Unauthorized");
            this.disconnectSocket(socket);
        } else if (e instanceof UnauthenticatedError) {
            socket.emit("errors", "Unauthenticated");
            this.disconnectSocket(socket);
        } else if (e instanceof DomainError) {
            socket.emit("errors", e.message);
        } else {
            socket.emit("errors", "Something went wrong");
        }
    }

    private disconnectSocket(socket: Socket) {
        logger.info(`Disconnecting socket ${socket.id}`);
        socket.disconnect();
    }

    private startTimedAlert() {
        // TODO remove
        const randomSentences = [
            "Hello, world!",
            "How are you doing today?",
            "Have a great day ahead!",
            "Stay awesome!",
            "Keep pushing forward!",
            "Just checking in!",
            "You are doing great!",
            "Believe in yourself!",
            "Never give up!",
            "Keep learning and growing!",
        ];

        setInterval(() => {
            const randomSentence =
                randomSentences[
                    Math.floor(Math.random() * randomSentences.length)
                ];
            this.io.emit("alert", randomSentence);
            logger.info(`Sent alert: ${randomSentence}`);
        }, 5000); // Send every 5 seconds
    }
}
