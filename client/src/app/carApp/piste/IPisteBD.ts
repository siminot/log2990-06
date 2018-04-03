import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";
import { TempsTour } from "../../../../../common/communication/TempsTour";

export interface PisteBD {
    _id: string;
    nom: string;
    description: string;
    points: IDefinitionPoint[];
    infos: String;
    tempsTours: [{ tempsTours: TempsTour }];
}
