import { Point } from "./point";
import { Line3 } from "three";

export class Droite extends Line3 {

    public depart: Point;
    public arrivee: Point;

    public constructor(depart: Point, arrivee: Point) {
        super(depart.vecteurPlanXZ, arrivee.vecteurPlanXZ);
        this.depart = depart;
        this.arrivee = arrivee;
    }
}
