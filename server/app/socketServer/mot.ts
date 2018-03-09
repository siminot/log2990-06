import { IMot } from "./../../../common/communication/IMot";
import { IDefinition } from "./../../../common/communication/IDefinition";
import { IMotGrille } from "./../../../common/communication/IMotGrille";

export class MotBase implements IMot {
    public mot: string;
    public definitions: IDefinition[];
}

export class Mot extends MotBase implements IMotGrille {

    public estTraite: boolean;
    public estVertical: boolean;
    public longueur: number;
    public premierX: number;
    public premierY: number;

}
