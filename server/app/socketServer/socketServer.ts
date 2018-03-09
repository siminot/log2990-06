import { Server } from "./../server";
import * as socket from "socket.io";
export class SocketServer {

    private io: SocketIO.Server;

    public constructor(private leServeur: Server) {
        this.io = socket(this.leServeur);
    
        console.log(" Socket serveur etabli");
    }

    public init(): void {
        this.ecoute();
        console.log("J'ecoute");
    }

    public ecoute(): void {
        this.io.on("connect", (unSocket: any) => {
            console.log("Client connecter");
            //this.connection(unSocket);
            //this.io.emit("message", "salut");

            // unSocket.on("disconnect", () => {
            //     this.deconnection();
            // });
        });
    }

    // private connection(unSocket: SocketIO.Socket): void {
    //     console.log("salut je suis la " + unSocket.id);
    // }

    

    // private deconnection(): void {
    //     console.log("un dude est parti");
    // }
}
