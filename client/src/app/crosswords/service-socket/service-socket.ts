import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import * as event from "../../../../../common/communication/evenementSocket";
import { Observable } from "rxjs/Observable";
import { Mot } from "../objetsTest/mot";
import { PaquetPartie } from "../objetsTest/paquetPartie";
import { Router } from "@angular/router";

const SERVER_URL: string = "http://localhost:3000/";
@Injectable()
export class SocketService {

    private socketClient: SocketIOClient.Socket;

    public constructor(private router: Router) {
    }

    private connectionServeur(): void {
        this.socketClient = socketIo(SERVER_URL);
    }

    public rejoindrePartie(nomPartie: string, nomJoueur: string): void {
        this.socketClient.emit(event.REJOINDRE, nomPartie, nomJoueur);
    }

    public creerPartie(nomPartie: string, difficultee: string, nomJoueur: string): void {
        this.connectionServeur();
        this.socketClient.on(event.CONNECTION, () => {
            this.socketClient.emit(event.CREATEUR, nomPartie, difficultee, nomJoueur);
        });

        this.socketClient.on(event.JOUEUR_QUITTE, () => {
            alert("Problème de connection avec le serveur! \nRetour à la page d'acceuil.");
            this.socketClient.disconnect();
            this.router.navigateByUrl("/");
        });
    }

    // pu utile
    public envoyerDiff(difficultee: string): void {
        this.socketClient.emit(event.ENVOYER_DIFF, difficultee);
        this.attenteDeCreationPartie();
    }

    // pu utile
    public attenteDeCreationPartie(): void {
        this.socketClient.on(event.DEMANDER_GRILLE, () => {
        });
    }

    public joueurVeutJoindre(nomSalle: string): void {
        this.socketClient.emit(event.REJOINDRE, nomSalle);
    }

    public demanderListePartie(): Observable<string[]> {
        this.connectionServeur();
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

    public demandeDeGrille(): Observable<void> {
        return new Observable<void>((unObs) => {
            this.socketClient.on(event.DEMANDER_GRILLE, () => unObs.next());
        });
    }

    public envoyerGrille(mots: Mot[]): void {
        this.socketClient.emit(event.ENVOYER_GRILLE, mots);
    }

    public recevoirListePartie(): Observable<Array<Array<string>>> {
        this.connectionServeur();
        this.socketClient.emit(event.ENVOYER_LISTE_PARTIES);

        return new Observable<Array<Array<string>>>((unObs) => {
            this.socketClient.on(event.ENVOYER_LISTE_PARTIES, (data: Array<Array<string>>) => unObs.next(data));
        });
    }

    public commencerPartie(): void {
        this.socketClient.emit(event.PAGE_CHARGEE);
    }

    public telechargerPaquetPartie(): Observable<PaquetPartie> {
        return new Observable<PaquetPartie>((unObs) => {
            this.socketClient.on(event.PAQUET_PARTIE, (paquet: PaquetPartie) => unObs.next(paquet));
        });
    }

    public envoyerMotSelect(mot: Mot): void {
        this.socketClient.emit(event.MOT_SELECTIONNE, mot );
    }

    public recevoirMotSelect(): Observable<Mot> {
        return new Observable<Mot>( (unObs) => {
            this.socketClient.on(event.MOT_SELECTIONNE, (mot: Mot) => unObs.next(mot));
        });
    }

    public recevoirMotSelectJ2(): Observable<Mot> {
        return new Observable<Mot>( (unObs) => {
            this.socketClient.on(event.MOT_SEL_J2, (mot: Mot) => unObs.next(mot));
        });
    }

    public envoyerTentative(mot: Mot): void {
        this.socketClient.emit(event.TENTATIVE, mot);
    }

    public recevoirMotPerdu(): Observable<Mot> {
        return new Observable<Mot>( (unObs) => {
            this.socketClient.on(event.MOT_PERDU, (motPerdu: Mot) => {
                unObs.next(motPerdu);
            });
        });
    }

    public recevoirMotTrouve(): Observable<Mot> {
        return new Observable<Mot>( (unObs) => {
            this.socketClient.on(event.MOT_TROUVE, (motTrouve: Mot) => {
                unObs.next(motTrouve);
            });
        });
    }

    public recevoirScore(): Observable<number[]> {
        return new Observable<number[]>( (unObs) => {
            this.socketClient.on(event.MODIFIER_SCORES, (nouveauScores: number[]) => {
                unObs.next(nouveauScores);
            });
        });
    }
}
