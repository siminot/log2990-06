import { Vector3, Vector2 } from "three";
import { IPoint } from "./IPoint";
import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

export class Point extends Vector2 implements IPoint, IDefinitionPoint {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public get vecteurPlanXZ(): Vector3 {
        return new Vector3(this.x, 0, this.y);
    }

    public get point(): Point {
        return this;
    }
}
