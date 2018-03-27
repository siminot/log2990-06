import { IMot } from "./IMot";
import { IDefinition } from "./IDefinition";

export interface IMotGrille extends IMot {
    mot: String;
    definitions: IDefinition[];
    estVertical: boolean;
    longueur: number;
    premierX: number;
    premierY: number;
}
