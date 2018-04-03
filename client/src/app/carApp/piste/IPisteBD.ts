import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

export interface PisteBD {
    _id: string;
    nom: string;
    description: string;
    points: IDefinitionPoint[];
    infos: String;
    tempsTours: [{ min: number, sec: number, milliSec: number }];
}
