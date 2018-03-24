// import * as socket from "socket.io";
import { Mot } from "./mot";
import { PaquetPartie } from "./paquet";
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
        if (this.joueurs.length < NB_JOUEUR_MAX) {
            this.joueurs.push(nouveauJoueur);
            nouveauJoueur.join(this.nomPartie);
            this.verifSiDeuxJoueurs();
        } else if (this.joueurs.length > NB_JOUEUR_MAX) {
            nouveauJoueur.disconnect();
        }
    }

    public ajouterNomJoueur(nouveauNom: string): void {
        this.nomJoueurs.push(nouveauNom);
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
        this.envoyerPaquetPartie();
        for (const joueur of this.joueurs) {
            this.definirEvenementsPartie(joueur);
        }
    }

    private fairePaquet(): PaquetPartie {
        const paquet: PaquetPartie = new PaquetPartie;
        paquet.grilleDeJeu = this.grilleDeJeu;
        paquet.nomJoeurs = this.nomJoueurs;
        paquet.nomPartie = this.nomPartie;
        paquet.difficultee = this.difficultee;

        return paquet;
    }

    private envoyerPaquetPartie(): void {
        for (const partie of this.joueurs) {
            partie.in(this.nomPartie).emit(event.COMMENCER_PARTIE);
            partie.on(event.PAGE_CHARGEE, () => {
                partie.in(this.nomPartie).emit(event.PAQUET_PARTIE, this.fairePaquet()
                );
            });
        }
    }

    private definirEvenementsPartie(joueur: SocketIO.Socket): void {
        this.defEvSelectionMot(joueur);
        this.defEvConfirmationMot(joueur);
    }

    // nom de methode pas trop clair.. 
    private defEvSelectionMot(joueur: SocketIO.Socket): void {
        joueur.on(event.MOT_SELECTIONNE, (motSel: Mot) => {
            joueur.in(this.nomPartie).emit(event.MOT_SEL_J2, motSel);
            this.joueurs[this.indexAutreJoueur(joueur)].in(this.nomPartie).emit(event.MOT_SELECTIONNE, motSel);
        });
    }
     // nom de methode pas trop clair.. 
    private defEvConfirmationMot(joueur: SocketIO.Socket): void {
        joueur.on(event.TENTATIVE, () => {
            // verif si le mot est bon fait au client ou au serveur <--- je comprends pas ce que cette phrase veut dire 
            this.verificationPartieTerminee();
        });
    }

    private verificationPartieTerminee(): void {
        // if tous les mots sont trouves,
        // envoyer evenements adequats
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

    private indexAutreJoueur(joueur: SocketIO.Socket): number {
        return Math.abs(this.joueurs.indexOf(joueur));
    }

    public detruirePartie(): void {
        for (const joueur of this.joueurs) {
            joueur.disconnect();
        }
    }
}
