import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";
import { ITempsBD } from "./ITempsBD";

export interface PisteBD {
    _id: string;
    nom: string;
    description: string;
    type: string;
    points: IDefinitionPoint[];
    temps: ITempsBD[];
    nbFoisJoue: number;
}
