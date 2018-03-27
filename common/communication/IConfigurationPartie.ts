export enum Difficulte {
    Facile = "facile",
    Normal = "normal",
    Difficile = "difficile"
}


export interface IConfigurationPartie {
    nombreDeJoueurs: number;
    niveauDeDifficulte: Difficulte;
}
