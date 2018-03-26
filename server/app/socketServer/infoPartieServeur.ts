import { Mot } from "./mot";
import { PaquetPartie } from "./paquet";
import * as event from "./../../../common/communication/evenementSocket";
// import * as WebRequest from "web-request";

const NB_JOUEUR_MAX: number = 2;

export class InfoPartieServeur {

    private nomPartie: string;
    private difficultee: string;
    private nomJoueurs: Array<string>;
    private scoreJoueur: number[];
    private joueurs: Array<SocketIO.Socket>;
    private joueursSontPret: number;
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
    }

    private async initNouvellePartie(): Promise<void> {
        this.grilleDeJeu = [];
        this.scoreJoueur = [0, 0];
        this.joueursSontPret = 0;
        // this.grilleDeJeu = await this.genererGrille();
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
        this.joueursSontPret = 1;
        if (this.grilleDeJeu.length) {
            this.direJoueursPartiePrete();
        }
    }

    private direJoueursPartiePrete(): void {
        this.joueursSontPret = 0;
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
        for (const joueur of this.joueurs) {
                joueur.in(this.nomPartie).emit(event.COMMENCER_PARTIE);
                joueur.on(event.PAGE_CHARGEE, () => {
                joueur.in(this.nomPartie).emit(event.PAQUET_PARTIE, this.fairePaquet()
                );
            });
        }
    }

    private definirEvenementsPartie(joueur: SocketIO.Socket): void {
        this.definirSelectionMotDef(joueur);
        this.definirSelectionMot(joueur);
        this.definirConfirmationMot(joueur);
    }

    private definirSelectionMot(joueur: SocketIO.Socket): void {
        joueur.on(event.MOT_SELECTIONNE, (motSel: Mot) => {
            joueur.in(this.nomPartie).emit(event.MOT_SEL_J2, motSel);
            this.joueurs[this.indexAutreJoueur(joueur)].in(this.nomPartie).emit(event.MOT_SELECTIONNE, motSel);
        });
    }

    private definirSelectionMotDef(joueur: SocketIO.Socket): void {
        joueur.on(event.EVOIE_MOT_DEF, (motSel: Mot) => {
            joueur.in(this.nomPartie).emit(event.MOT_SEL_J2, motSel);
            this.joueurs[this.indexAutreJoueur(joueur)].in(this.nomPartie).emit(event.EVOIE_MOT_DEF, motSel);
        });
    }

    private definirConfirmationMot(joueur: SocketIO.Socket): void {
        joueur.on(event.TENTATIVE, (motABloquer: Mot) => {
            for (const mot of this.grilleDeJeu) {
                if (motABloquer.mot.toLowerCase() === mot.mot.toLowerCase()) {
                    this.confirmerMotTrouve(joueur, motABloquer);
                }
            }
        });
    }

    private confirmerMotTrouve(joueur: SocketIO.Socket, motABloquer: Mot): void {
        this.actualisationScores(joueur);
        this.retirerMotDeGrille(motABloquer);
        joueur.in(this.nomPartie).emit(event.MOT_PERDU, motABloquer);
        this.joueurs[this.indexAutreJoueur(joueur)].in(this.nomPartie).emit(event.MOT_TROUVE, motABloquer);
        this.verificationFinDePartie();
    }

    private retirerMotDeGrille(motABloquer: Mot): void {
        for (const mot of this.grilleDeJeu) {
            if (motABloquer.mot.toLowerCase() === mot.mot.toLowerCase()) {
                this.grilleDeJeu.splice(this.grilleDeJeu.indexOf(mot), 1);
            }
        }
    }

    private verificationFinDePartie(): void {
        if (this.grilleDeJeu.length === 0) {
            if (this.scoreJoueur[0] > this.scoreJoueur[1]) {
                this.joueurs[1].in(this.nomPartie).emit(event.FINPARTIE, event.VICTOIRE);
                this.joueurs[0].in(this.nomPartie).emit(event.FINPARTIE, event.DEFAITE);
            } else if (this.scoreJoueur[0] < this.scoreJoueur[1]) {
                this.joueurs[0].in(this.nomPartie).emit(event.FINPARTIE, event.VICTOIRE);
                this.joueurs[1].in(this.nomPartie).emit(event.FINPARTIE, event.DEFAITE);
            } else {
                this.joueurs[0].in(this.nomPartie).emit(event.FINPARTIE, event.EXAEQUO);
                this.joueurs[1].in(this.nomPartie).emit(event.FINPARTIE, event.EXAEQUO);
            }
            this.evenementsFinPartie();
        }
    }

    private evenementsFinPartie(): void {
        for (const joueur of this.joueurs) {
            joueur.on(event.RECOMMENCER_PARTIE, () => {
                if (++this.joueursSontPret === NB_JOUEUR_MAX) {
                    this.nouvellePartie();
                }
                this.initNouvellePartie();
            });
        }
    }

    private nouvellePartie(): void {
        this.initNouvellePartie();
        this.envoyerPaquetPartie();
    }

    private actualisationScores(joueur: SocketIO.Socket): void {
        this.scoreJoueur[this.joueurs.indexOf(joueur)]++;
        for (const unJoueur of this.joueurs) {
            unJoueur.in(this.nomPartie).emit(event.MODIFIER_SCORES, this.scoreJoueur);
        }
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
        return Math.abs(this.joueurs.indexOf(joueur) - 1);
    }

    // private async genererGrille(): Promise<Mot[]> {
    //     return WebRequest.json<Mot[]>("http://localhost:3000/grille/" + this.difficultee);
    // }

    public detruirePartie(): void {
        for (const joueur of this.joueurs) {
            joueur.disconnect();
        }
    }
}
