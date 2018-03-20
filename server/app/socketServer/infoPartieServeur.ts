// import * as socket from "socket.io";
import { Mot } from "./mot";
import * as event from "./../../../common/communication/evenementSocket";
// import { Socket } from "net";

const NB_JOUEUR_MAX: number = 2;

export class InfoPartieServeur {

    private nomPartie: string;
    private difficultee: string;
    private joueurs: Array<SocketIO.Socket>;
    private grilleDeJeu: Mot[];

    public constructor(nomPartie: string,
                       difficultee: string,
                       socketCreateur: SocketIO.Socket) {
        this.joueurs = new Array<SocketIO.Socket>();
        this.joueurs.push(socketCreateur);
        this.nomPartie = nomPartie;
        this.difficultee = difficultee;
        this.init();
    }

    private init(): void {
        this.grilleDeJeu = [];
        for (const joueur of this.joueurs) {
            this.ajouterJoueur(joueur);
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
            // TODO: faut attendre la grille avant!
            this.debuterPartie();
        } else if (this.joueurs.length === 1) {
            this.demanderGrille();
        }
    }

    private debuterPartie(): void {
        for (const joueur of this.joueurs) {
            this.definirEvenementsPartie(joueur);
            joueur.to(joueur.id).emit(event.ENVOYER_GRILLE, this.grilleDeJeu);
        }
    }

    private definirEvenementsPartie(joueur: SocketIO.Socket): void {
        //
    }

    public demanderGrille(): void {
        this.joueurs[0].emit(event.DEMANDER_GRILLE);
        this.joueurs[0].on(event.ENVOYER_GRILLE, (laGrille: Mot[]) => {
            this.recevoirGrille(laGrille);
        });
    }

    private recevoirGrille(uneNouvelleGrille: Mot[]): void {
        this.grilleDeJeu = uneNouvelleGrille;
    }

    public get obtenirNomPartie(): string {
        return this.nomPartie;
    }

    public get obtenirDiff(): string {
        return this.difficultee;
    }

}
