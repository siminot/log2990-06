import { Server } from "./server";
import Types from "./types";
import "reflect-metadata";
import { container } from "./inversify.config";

import { SocketServer } from "./socketServer/socketServer";

const server: Server = container.get<Server>(Types.Server);

server.init();

const socketServer: SocketServer = new SocketServer(server.server);
socketServer.init();
