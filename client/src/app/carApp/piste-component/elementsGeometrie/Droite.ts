import { Point } from "./point";
import { Line3 } from "three";

export class Droite extends Line3 {

    public constructor(depart: Point, arrivee: Point) {
        super(depart.vecteurPlanXZ, arrivee.vecteurPlanXZ);
    }

    public modifierDepart(point: Point): void {
        this.start = point.vecteurPlanXZ;
    }

    public modifierArrivee(point: Point): void {
        this.end = point.vecteurPlanXZ;
    }
}
