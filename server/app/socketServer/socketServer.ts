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
        this.parties = new Array<InfoPartieServeur>();
    }

    public init(): void {
        this.ecoute();
    }

    private ecoute(): void {
        this.io.on(event.CONNECTION, (unSocket: SocketIO.Socket) => {
            unSocket.emit(event.CONNECTION);
            this.connection(unSocket);
            unSocket.on(event.DECO, () => {
                this.deconnection();
            });
        });
    }

    private connection(unSocket: SocketIO.Socket): void {
        console.log("client connecte: " + unSocket.id);
        unSocket.on(event.CREATEUR, (nomRoom: string, difficultee: string, nomJoueur: string) => {
            this.creerUnePartie(nomRoom, difficultee, nomJoueur, unSocket);
            // unSocket.to(unSocket.id).emit();
        });
        unSocket.on(event.ENVOYER_LISTE_PARTIES, () => {
            this.envoyerListePartie(unSocket);
        });
        unSocket.on(event.REJOINDRE, (nomRoom: string, nomJoueur: string) => {
            this.rejoindrePatrie(nomRoom, nomJoueur, unSocket);
        });
    }

    private creerUnePartie(nomRoom: string, difficultee: string, nomJoueur: string, unSocket: SocketIO.Socket): void {
        this.parties.push(new InfoPartieServeur(nomRoom, difficultee, nomJoueur, unSocket));
    }

    private rejoindrePatrie(nomRoom: string, nomJoueur: string, unSocket: SocketIO.Socket): void {

        for (const partie of this.parties) {
            if (partie.obtenirNomPartie === nomRoom) {
                partie.ajouterJoueur(unSocket);
            }
        }
    }

    private envoyerListePartie(unSocket: SocketIO.Socket): void {
        const listePartie: Array<Array<string>> = new Array<Array<string>>(); 
        for (let i: number = 0; i < this.parties.length; i++) {
            listePartie[i] = new Array<string>();
            listePartie[i].push(this.parties[i].obtenirNomPartie);
            listePartie[i].push(this.parties[i].obtenirDiff);
            listePartie[i].push(this.parties[i].obtenirNomCreateur);
        }
        console.log(listePartie);
        unSocket.emit(event.ENVOYER_LISTE_PARTIES, listePartie);
    }

    private deconnection(): void {
        // console.log("un dude est parti");
    }
}
