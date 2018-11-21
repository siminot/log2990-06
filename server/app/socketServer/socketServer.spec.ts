import * as assert from "assert";
import { SocketServer } from "./socketServer";
import * as http from "http";
import * as event from "./../../../common/communication/evenementSocket";
import * as socketIo from "socket.io-client";
import { SERVER_URL } from "../../../common/communication/Server";


describe("SocketServer", () => {

    const server: http.Server = new http.Server();
    const socketServer: SocketServer = new SocketServer(server);
    socketServer.init();

    it("Devrait construire", () => {
        assert.equal(socketServer["parties"].length, 0);
    });

    const socketClient: SocketIOClient.Socket = socketIo(SERVER_URL);

    it("Le client peut se connecter", () => {
        socketClient.on(event.CONNECTION, () => {
            assert.equal(socketClient.connected, true);
        });
    });

    socketClient.emit(event.CREATEUR, "partieTest", "difficile", "bob");

});
