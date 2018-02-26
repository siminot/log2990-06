export class OptionPartie {
    public idPartie: number; // id possiblement pour identifier une partie (en ligne)
    public nombreJoueur: number;
    public difficulte: string;
    public requete: string;

    constructor() {
        this.idPartie = 0;
        this.nombreJoueur = 0;
        this.difficulte = "facile";
        this.requete = "http://localhost:3000/grille/facile";
    }

}