import { Vector3, Vector2 } from "three";

const PROFONDEUR: number = 0;

export class Point extends Vector2 {

    public constructor(x: number, y: number) {
        super(x, y);
    }

    public get vecteurPlanXZ(): Vector3 {
        return new Vector3(this.x, PROFONDEUR, this.y);
    }
}
