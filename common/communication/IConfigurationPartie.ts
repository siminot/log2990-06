export enum Difficulte {facile, normal, difficile}

export interface IConfigurationPartie {
    nombreDeJoueurs: number;
    niveauDeDifficulte: Difficulte;
}
