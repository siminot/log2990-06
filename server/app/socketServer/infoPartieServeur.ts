// import * as socket from "socket.io";
import { Mot } from "./mot";
import * as event from "./../../../common/communication/evenementSocket";
// import { Socket } from "net";

const NB_JOUEUR_MAX: number = 2;

export class InfoPartieServeur {

    private nomPartie: string;
    private difficultee: string;
    private nomJoueurs: Array<string>;
    private joueurs: Array<SocketIO.Socket>;
    private joueursSontPret: boolean;
    private grilleDeJeu: Mot[];

    public constructor(nomPartie: string,
                       difficultee: string,
                       nomJoueur: string,
                       socketCreateur: SocketIO.Socket) {
        this.initialisationsElemPartie(nomPartie, difficultee, nomJoueur);
        this.ajouterJoueur(socketCreateur);
        this.initNouvellePartie();
    }

    private initialisationsElemPartie(nomPartie: string, difficultee: string, nomJoueur: string): void {
        this.joueursSontPret = false;
        this.joueurs = new Array<SocketIO.Socket>();
        this.nomPartie = nomPartie;
        this.difficultee = difficultee;
        this.nomJoueurs = new Array<string>();
        this.nomJoueurs.push(nomJoueur);
    }

    private initNouvellePartie(): void {
        this.grilleDeJeu = [];
    }

    public ajouterJoueur(nouveauJoueur: SocketIO.Socket): void {
        this.joueurs.push(nouveauJoueur);
        if (this.joueurs.length <= NB_JOUEUR_MAX) {
            nouveauJoueur.join(this.nomPartie);
            this.verifSiDeuxJoueurs();
        } else if (this.joueurs.length > NB_JOUEUR_MAX) {
            nouveauJoueur.disconnect();
        }
    }

    private verifSiDeuxJoueurs(): void {
        if (this.joueurs.length === NB_JOUEUR_MAX) {
            this.joueursAttenteGrille();
        } else if (this.joueurs.length === 1) {
            this.demanderGrille();
        }
    }

    private joueursAttenteGrille(): void {
        this.joueursSontPret = true;
        if (this.grilleDeJeu.length) {
            this.direJoueursPartiePrete();
        }
    }

    private direJoueursPartiePrete(): void {
        for (const joueur of this.joueurs) {
            joueur.in(this.nomPartie).emit(event.COMMENCER_PARTIE);
            this.definirEvenementsPartie(joueur);
        }
    }

    private definirEvenementsPartie(joueur: SocketIO.Socket): void {
        //
    }

    public demanderGrille(): void {
        this.joueurs[0].emit(event.DEMANDER_GRILLE);
        this.joueurs[0].on(event.ENVOYER_GRILLE, (laGrille: Mot[]) => {
            this.recevoirGrille(laGrille);
            if (this.joueursSontPret) {
                this.direJoueursPartiePrete();
            }
        });
    }

    private recevoirGrille(uneNouvelleGrille: Mot[]): void {
        this.grilleDeJeu = uneNouvelleGrille;
    }

    public socketEstDansPartie(unSocket: SocketIO.Socket): boolean {
        for (const joueur of this.joueurs) {
            if (joueur.id === unSocket.id) {
                return true;
            }
        }

        return false;
    }

    public partieEstPleine(): boolean {
        return this.joueurs.length === NB_JOUEUR_MAX ? true : false;
    }

    public get obtenirNomPartie(): string {
        return this.nomPartie;
    }

    public get obtenirDiff(): string {
        return this.difficultee;
    }

    public get obtenirNomCreateur(): string {
        return this.nomJoueurs[0];
    }

    public detruirePartie(): void {
        for (const joueur of this.joueurs) {
            joueur.to(this.nomPartie).emit(event.JOUEUR_QUITTE);
            joueur.disconnect();
        }
    }
}
