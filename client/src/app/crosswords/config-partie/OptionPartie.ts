import { ConfigurationPartie } from "../../../../../common/communication/ConfigurationPartie";

export class OptionPartie implements ConfigurationPartie {
    public nombreJoueur: number;
    public difficulte: string;

    public idPartie: number; // id possiblement pour identifier une partie (en ligne)
    public requete: string;
}
