import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import * as event from "../../../../../common/communication/evenementSocket";
import { Observable } from "rxjs/Observable";
import { Mot } from "../objetsTest/mot";
// import { Mot } from "../objetsTest/mot";
// import { Observer } from "rxjs/Observer";

const SERVER_URL: string = "http://localhost:3000/";
@Injectable()
export class SocketService {

    private socketClient: SocketIOClient.Socket;

    public constructor() {
    }

    private connectionServeur(): void {
        this.socketClient = socketIo(SERVER_URL);
    }

    public rejoindrePartie(): void {
        this.connectionServeur();
        //
    }

    public creerPartie(nomPartie: string, difficultee: string): void {
        this.connectionServeur();
        this.socketClient.on(event.CONNECTION, () => {
            this.socketClient.emit(event.CREATEUR, nomPartie, difficultee);
            // TODO: requete grille
            // generer la grille
            // quand la grille est faite
            // this.socketClient.emit(event.ENVOYER_GRILLE, laGrille);
        });

        this.socketClient.on("connect_error", () => {
            // TODO: Afficher au client que la conneciton n'a pas marchee
            this.socketClient.disconnect();
        });
        //
    }

    public envoyerDiff(difficultee: string): void {
        this.socketClient.emit(event.ENVOYER_DIFF, difficultee);
        this.attenteDeCreationPartie();
    }

    public attenteDeCreationPartie(): void {
        this.socketClient.on(event.DEMANDER_GRILLE, () => {
            console.log("Le serveur attend la grille");
        });
    }

    public joueurVeutJoindre(nomSalle: string): void {
        this.socketClient.emit(event.REJOINDRE, nomSalle);
    }

    public demanderListePartie(): Observable<string[]> {
        this.socketClient.emit(event.ENVOYER_LISTE_PARTIES);

        return new Observable<string[]>((unObs) => {
            this.socketClient.on(event.ENVOYER_LISTE_PARTIES, (liste: string[]) => {
                unObs.next();
            });
        });
    }

    public chargementComplete(): Observable<void> {
        return new Observable<void>((unObs) => {
            this.socketClient.on(event.COMMENCER_PARTIE, () => {
                unObs.next();
            });
        });

    }

    public envoyerGrille(): Observable<void> {
        return new Observable<void>( (unObs) => {
            this.socketClient.on(event.DEMANDER_GRILLE, () => unObs.next());
        });
    }

//     public receptionMatrice(): Observable<Mot[]> {
//         return new Observable<Mot[]>((observer) => {
//             this.socketClient.on(event.ENVOYER_GRILLE, (mots: Mot[]) => observer.next(mots));
//         }
// }

}
