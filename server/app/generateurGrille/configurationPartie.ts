import { IConfigurationPartie, Difficulte } from "../../../common/communication/IConfigurationPartie";

export class ConfigurationPartie implements IConfigurationPartie {

    public niveauDeDifficulte: Difficulte;
    public nombreDeJoueurs: number;

    public constructor (niveau: Difficulte, nbJoueurs: number) {
        this.niveauDeDifficulte = niveau;
        this.nombreDeJoueurs = nbJoueurs;
    }
}
