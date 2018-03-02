import { IConfigurationPartie } from "../../../common/communication/IConfigurationPartie";

export class ConfigurationPartie implements IConfigurationPartie {

    public niveauDeDifficulte: string;
    public nombreDeJoueurs: number;

    public constructor (niveau: string, nbJoueurs: number) {
        this.niveauDeDifficulte = niveau;
        this.nombreDeJoueurs = nbJoueurs;
    }
}
