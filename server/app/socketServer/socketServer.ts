import { Server } from "./../server";
import * as socket from "socket.io";

export class SocketServer {

    private io: SocketIO.Server;

    public constructor(leServeur: Server) {
        this.io = socket(leServeur);
    }

    public init(): void {
        this.ecoute();
        console.log("J'ecoute");
    }

    private ecoute(): void {
        this.io.on("connection", (unSocket: SocketIO.Socket) => {
            this.connection(unSocket);
            this.io.emit("message", "salut");

            unSocket.on("disconnect", () => {
                this.deconnection();
            });
        });
    }

    private connection(unSocket: SocketIO.Socket): void {
        console.log("salut je suis la " + unSocket.id);
    }

    private deconnection(): void {
        console.log("un dude est parti");
    }
}
