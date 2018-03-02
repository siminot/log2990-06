import { ConfigurationPartie } from "../../../common/Partie/ConfigurationPartie";

export class OptionPartie implements ConfigurationPartie {

    public niveauDifficultee: string;
    public nombreDeJoueurs: number;

    public constructor (niveau: string, nbJoueurs: number) {
        this.niveauDifficultee = niveau;
        this.nombreDeJoueurs = nbJoueurs;
    }

    public get niveau(): string {
        return this.niveauDifficultee;
    }

    public get nbJoueurs(): number {
        return this.nombreDeJoueurs;
    }

    public setDifficultee(nouvelleDiff: string): void {
        this.niveauDifficultee = nouvelleDiff;
    }

}
