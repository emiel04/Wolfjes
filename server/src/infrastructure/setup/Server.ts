import { registerRoutes } from "@infrastructure/setup/Routes";
import morgan from "morgan";
import type { Server as HttpServer } from "node:http";
import cors from "cors";
import express, {
    type NextFunction,
    type Request,
    type Response,
    type Express,
} from "express";
import logger from "@infrastructure/setup/helper/Logger";
import { WebSocketServer } from "@infrastructure/setup/websocket/WebsocketServer";
import errorMiddleware from "@infrastructure/setup/middleware/error.middleware";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/lib/build/recipe/session/framework/express";
import {
    middleware,
    errorHandler,
    SessionRequest,
} from "supertokens-node/lib/build/framework/express/framework";
import config from "@helper/config";
import { SuperTokensConfig } from "@infrastructure/setup/supertokens/SuperTokensConfig";

class Server {
    private readonly app: Express;
    private webSocketServer?: WebSocketServer;
    private httpServer?: HttpServer;

    constructor() {
        this.app = express();
        supertokens.init(SuperTokensConfig);
        this.app.use(
            cors({
                origin: config.websiteDomain,
                allowedHeaders: [
                    "content-type",
                    ...supertokens.getAllCORSHeaders(),
                ],
                credentials: true,
            })
        );

        this.app.use(express.json());

        this.app.use(middleware()); // supertokens

        this.app.use(
            morgan("common", {
                stream: { write: (msg: any) => logger.info(msg.trim()) },
            })
        );

        this.registerRoutes();

        this.app.use(errorHandler()); // supertokens

        this.registerErrorHandler();
        this.handleProcessSignals();
    }

    private registerRoutes() {
        registerRoutes(this.app);
    }

    private registerErrorHandler() {
        this.app.use(errorMiddleware);
    }

    private handleProcessSignals() {
        const signalHandler = async (): Promise<void> => {
            logger.info("Received signal. Shutting down gracefully...");
            process.exit(0);
        };

        process.on("SIGINT", signalHandler); // Handle Ctrl+C
        process.on("SIGTERM", signalHandler);
    }

    public start(port = 3000) {
        this.httpServer = this.app.listen({ port });
        this.webSocketServer = new WebSocketServer(this.httpServer);
        this.webSocketServer.initialize();
        logger.info(`Server is running at http://localhost:${port}`);
    }
}

export default Server;
