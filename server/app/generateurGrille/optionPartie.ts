import { ConfigurationPartie } from "../../../common/communication/ConfigurationPartie";

export class OptionPartie implements ConfigurationPartie {

    public difficulte: string;
    public nombreJoueur: number;

    public constructor (niveau: string, nbJoueurs: number) {
        this.difficulte = niveau;
        this.nombreJoueur = nbJoueurs;
    }

    public get niveau(): string {
        return this.difficulte;
    }

    public get nbJoueurs(): number {
        return this.nombreJoueur;
    }

    public setDifficultee(nouvelleDiff: string): void {
        this.difficulte = nouvelleDiff;
    }

}
