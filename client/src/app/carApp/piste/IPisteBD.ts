import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

export interface ITemps {
    nom: string;
    min: number;
    sec: number;
    milliSec: number;
}

export interface PisteBD {
    _id: string;
    nom: string;
    description: string;
    type: string;
    points: IDefinitionPoint[];
    temps: ITemps[];
    nbFoisJoue: number;
}
