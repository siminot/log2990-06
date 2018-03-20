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
        this.joueurs = new Array<SocketIO.Socket>();
        this.nomPartie = nomPartie;
        this.difficultee = difficultee;
        this.nomJoueurs = new Array<string>();
        this.nomJoueurs.push(nomJoueur);
        console.log("NomPartie: " + this.nomPartie);
        console.log("NomCreateur: " + this.nomJoueurs[0]);
        console.log("Diff: " + this.difficultee);
    }

    private initNouvellePartie(): void {
        this.grilleDeJeu = [];
    }

    public ajouterJoueur(nouveauJoueur: SocketIO.Socket): void {
        this.joueurs.push(nouveauJoueur);
        if (this.joueurs.length < NB_JOUEUR_MAX) {
            nouveauJoueur.join(this.nomPartie);
            this.verifSiDeuxJoueurs();
        } else if (this.joueurs.length >= NB_JOUEUR_MAX) {
            nouveauJoueur.disconnect();
        }
        nouveauJoueur.on(event.CHANGER_NOM_JOUEUR, (nouveauNom: string) => {
            this.nomJoueurs.push(nouveauNom);
        });
        console.log("Joueur ajoue");
    }

    private verifSiDeuxJoueurs(): void {
        console.log("nb Joueur = " + this.joueurs.length);
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
            console.log("leServeur lance la partie");
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
        console.log("Grille bien recu !");
    
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

}
