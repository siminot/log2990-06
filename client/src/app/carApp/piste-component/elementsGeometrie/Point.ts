import { Vector3, Vector2 } from "three";
import { IPoint } from "./IPoint";

const PROFONDEUR: number = 5;

export class Point extends Vector2 implements IPoint {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public get vecteurPlanXZ(): Vector3 {
        return new Vector3(this.x, PROFONDEUR, this.y);
    }

    public get point(): Point {
        return this;
    }

    public estEgalA(autrePoint: Point): boolean {
        return this.x === autrePoint.x &&
               this.y === autrePoint.y;
    }
}
