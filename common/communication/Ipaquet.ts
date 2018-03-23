import { IMotGrille } from "./IMotGrille";

export interface IPaquetPartie {
    nomPartie: string; 
    nomJoeurs: Array<string>; 
    grilleDeJeu: IMotGrille[];
}