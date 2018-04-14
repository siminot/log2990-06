import { IConfigurationPartie } from "../../../common/communication/IConfigurationPartie";
import { Difficulte } from "../../../common/communication/Difficulte";

export class ConfigurationPartie implements IConfigurationPartie {

    public niveauDeDifficulte: Difficulte;
    public nombreDeJoueurs: number;

    public constructor (niveau: Difficulte, nbJoueurs: number) {
        this.niveauDeDifficulte = niveau;
        this.nombreDeJoueurs = nbJoueurs;
    }
}
