// import * as socket from "socket.io";
import { Mot } from "./mot";
import * as event from "./../../../common/communication/evenementSocket";

const NB_JOUEUR_MAX: number = 2;

export class InfoPartieServeur {

    private nomPartie: string;
    private joueurs: SocketIO.Socket[];
    private grilleDeJeu: Mot[];

    public constructor(nomPartie: string, socketCreateur: SocketIO.Socket) {
        this.joueurs.push(socketCreateur);
        this.nomPartie = nomPartie;
        this.init();
    }

    private init(): void {
        this.joueurs = [];
        this.grilleDeJeu = [];
        for (const elem of this.joueurs) {
            this.ajouterJoueur(elem);
            this.demanderGrille(elem);
        }
    }

    public ajouterJoueur(nouveauJoueur: SocketIO.Socket): void {
        if (this.joueurs.length < NB_JOUEUR_MAX) {
            nouveauJoueur.join(this.nomPartie);
            this.verifSiDeuxJoueurs();
        } else if (this.joueurs.length >= NB_JOUEUR_MAX) {
            nouveauJoueur.disconnect();
        }
    }

    private verifSiDeuxJoueurs(): void {
        if (this.joueurs.length === NB_JOUEUR_MAX) {
            this.debuterPartie();
        }
    }

    private debuterPartie(): void {
        this.joueurs[0].to(this.nomPartie).emit(event.ENVOYER_GRILLE, this.grilleDeJeu);
        // attendre un signal que les deux joueurs sont prets n shit
        for (const joueur of this.joueurs) {
            this.definirEvenementsPartie(joueur);
        }
    }

    private definirEvenementsPartie(joueur: SocketIO.Socket): void {
        //
    }

    public demanderGrille(unSocket: SocketIO.Socket): void {
        unSocket.to(this.nomPartie).emit(event.DEMANDER_GRILLE);
        unSocket.on(event.ENVOYER_GRILLE, (laGrille: Mot[]) => {
            this.recevoirGrille(laGrille);
        });
    }

    private recevoirGrille(uneNouvelleGrille: Mot[]): void {
        this.grilleDeJeu = uneNouvelleGrille;
    }

    public obtenirNomPartie(): string {
        return this.nomPartie;
    }

}
