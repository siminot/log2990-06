import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

export interface PisteBD {
    _id: string;
    nom: string;
    description: string;
    type: string;
    points: IDefinitionPoint[];
    temps: [{ nom: string, min: number, sec: number, milliSec: number }];
    nbFoisJoue: number;
}
