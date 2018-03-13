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
        // this.demanderDiff(/*socketCreateur*/);
        this.nomPartie = nomPartie;
        this.difficultee = difficultee;
        this.init();
    }

    // private demanderDiff(/*socketCreateur: SocketIO.Socket*/): void {
    //         this.joueurs[0].on(event.ENVOYER_DIFF, (difficultee: string) => {
    //         this.difficultee = difficultee;
    //         console.log("Difficultee " + this.difficultee);
    //         this.demanderGrille();
    //     });
    // }

    private init(): void {
        this.grilleDeJeu = [];
        for (const elem of this.joueurs) {
            this.ajouterJoueur(elem);
        }
        console.log("Nom de la partie " + this.nomPartie);
        console.log("Difficultee partie " + this.difficultee);
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

    public demanderGrille(): void {
        console.log("Emmit de la demande de grille");
        this.joueurs[0].emit(event.DEMANDER_GRILLE);
        this.joueurs[0].on(event.ENVOYER_GRILLE, (laGrille: Mot[]) => {
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
