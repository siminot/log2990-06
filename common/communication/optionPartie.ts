const DIFFICULTE_DEFAUT: string = "facile";

export class OptionPartie {
    public idPartie: number; // id possiblement pour identifier une partie (en ligne)
    public nombreJoueur: number;
    public difficulte: string;
    public requete: string;

    constructor() {
        this.idPartie = 0;
        this.nombreJoueur = 0;
        this.difficulte = DIFFICULTE_DEFAUT;
        this.requete = "";
    }

}