// import { Server } from "./../server";
import * as http from "http";
import * as socket from "socket.io";
import * as event from "./../../../common/communication/evenementSocket";
import { InfoPartieServeur } from "./infoPartieServeur";

export class SocketServer {

    private io: SocketIO.Server;
    private parties: Array<InfoPartieServeur>;

    public constructor(private leServeur: http.Server) {
        this.io = socket(this.leServeur);
        this.parties = [];
    }

    public init(): void {
        this.ecoute();
    }

    private ecoute(): void {
        this.io.on(event.CONNECTION, (unSocket: SocketIO.Socket) => {
            this.connection(unSocket);
            unSocket.on(event.DECO, () => {
                this.deconnection();
            });
        });
    }

    private connection(unSocket: SocketIO.Socket): void {
        unSocket.emit(event.ID);
        console.log("client connecte: " + unSocket.id);
        unSocket.on(event.CREATEUR, (nomRoom: string) => {
            this.creerUnePartie(nomRoom, unSocket);
        });
        unSocket.on(event.ENVOYER_LISTE_PARTIES, () => {
            this.envoyerListePartie(unSocket);
        });
        unSocket.on(event.REJOINDRE, (nomRoom: string) => {
            console.log("Client veut rejoindre une salle");
            console.log(nomRoom);
            //this.rejoindrePatrie(nomRoom, unSocket);
        });
    }

    private creerUnePartie(nomRoom: string, unSocket: SocketIO.Socket): void {

        this.parties.push(new InfoPartieServeur(nomRoom, unSocket));
        // unSocket.emit(event.ROOM_CREEE);
        // if (nomRoom in this.rooms) {
        //     this.mauvaisNomRoom(event.NOM_EXISTANT, unSocket);
        // } else {
        //     this.rooms.push(nomRoom);
        //     unSocket.emit(event.ROOM_CREEE);
        //     unSocket.join(nomRoom);
        //     this.recevoirGrille(unSocket);
        // }
    }

    // private rejoindrePatrie(nomRoom: string, unSocket: SocketIO.Socket): void {

    //     for (const partie of this.parties) {
    //         if (partie.obtenirNomPartie() === nomRoom) {
    //             partie.ajouterJoueur(unSocket);
    //         }
    //     }
    //     // if (nomRoom in this.rooms) {
    //     //     unSocket.join(nomRoom);
    //     //     this.envoyerGrille(unSocket);
    //     // } else {
    //     //     this.mauvaisNomRoom(event.NOM_NON_EXISTANT, unSocket);
    //     // }
    // }

    private envoyerListePartie(unSocket: SocketIO.Socket): void {
        const listePartie: string[] = [];
        for (const partie of this.parties) {
            listePartie.push(partie.obtenirNomPartie());
        }
        unSocket.to(unSocket.id).emit(event.ENVOYER_LISTE_PARTIES, listePartie);
    }

    // private mauvaisNomRoom(evenement: string, unSocket: SocketIO.Socket): void {
    //     unSocket.to(unSocket.id).emit(evenement);
    //     unSocket.disconnect();
    // }

    // private recevoirGrille(unSocket: SocketIO.Socket): void {
    //     unSocket.to(unSocket.id).emit(event.DEMANDER_GRILLE);
    //     unSocket.on(event.ENVOYER_GRILLE, (laGrille: Mot[]) => {
    //         this.grilleDeJeu = laGrille;
    //     });
    // }

    // private envoyerGrille(unSocket: SocketIO.Socket): void {
    //     unSocket.to(unSocket.id).emit(event.ENVOYER_GRILLE, this.grilleDeJeu);
    // }

    // private attenteAutreJoueur(nomRoom: string, unSocket: SocketIO.Socket): void {
    //     //
    // }

    private deconnection(): void {
        // console.log("un dude est parti");
    }
}
