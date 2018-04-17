import { Server } from "./server";
import Types from "./types";
import "reflect-metadata";
import { container } from "./inversify.config";

import { SocketServer } from "./socketServer/socketServer";

export const LE_SERVER: Server = container.get<Server>(Types.Server);

LE_SERVER.init();

const socketServer: SocketServer = new SocketServer(LE_SERVER.server);
socketServer.init();
