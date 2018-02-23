export class OptionPartie {
    private idPartie: string; // id possiblement pour identifier une partie (en ligne)
    private nombreJoueur: number;
    private difficulte: string;
    private requete: string;

    constructor() {
        this.idPartie = "ZERO";
        this.nombreJoueur = 0;
        this.difficulte = "facile";
        this.requete = "http://localhost:3000/grille/facile";
    }

    public get id(): string {
        return this.idPartie;
    }

    public get nbJoueur(): number {
        return this.nombreJoueur;
    }

    public get difficulty(): string {
        return this.difficulte;
    }

    public get request(): string {
        return this.requete;
    }
}