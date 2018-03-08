import { Server } from "./../server";
import * as socket from "socket.io";
import * as event from "./../../../common/communication/evenementSocket";
import { Mot } from "./mot";

export class SocketServer {

    private io: SocketIO.Server;
    private rooms: Array<string>;
    private grilleDeJeu: Mot[];

    public constructor(leServeur: Server) {
        this.io = socket(leServeur);
    }

    public init(): void {
        this.ecoute();
    }

    private ecoute(): void {
        this.io.on(event.CONNECTION, (unSocket: SocketIO.Socket) => {
            this.connection(unSocket);
            unSocket.emit("message", "salut");

            unSocket.on(event.DECO, () => {
                this.deconnection();
            });
        });
    }

    private connection(unSocket: SocketIO.Socket): void {
        // demande au client s'il cree ou joindre la partie;
        unSocket.emit(event.ID);
        // Si le client est un createur
        unSocket.on(event.CREATEUR, (nomRoom: string) => {
            this.creerUnePartie(nomRoom, unSocket);
        });
    }

    private creerUnePartie(nomRoom: string, unSocket: SocketIO.Socket): void {
        if (nomRoom in this.rooms) {
            unSocket.emit(event.NOM_EXISTANT);
        } else {
            this.rooms.push(nomRoom);
            unSocket.emit(event.ROOM_CREEE);
            unSocket.join(nomRoom);
            this.recevoirGrille(unSocket);
        }
    }

    private recevoirGrille(unSocket: SocketIO.Socket): void {
        unSocket.on(event.ENVOYER_GRILLE, (laGrille: Mot[]) => {
            this.grilleDeJeu = laGrille;
        });
    }

    private deconnection(): void {
        // console.log("un dude est parti");
    }
}
