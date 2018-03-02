import { IConfigurationPartie } from "../../../../../common/communication/IConfigurationPartie";

export class ConfigurationPartie implements IConfigurationPartie {
    public nombreDeJoueurs: number;
    public niveauDeDifficulte: string;

    public idPartie: number; // id possiblement pour identifier une partie (en ligne)
    public requete: string;
}
