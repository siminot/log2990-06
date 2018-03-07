import { Vector3 } from "three";

export class Point {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get vecteurPlanXZ(): Vector3 {
        return new Vector3(this.x, 0, this.y);
    }
}
