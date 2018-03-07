import { Point } from "./Point";
import { Vector2 } from "three";

export class VecteurPiste {

    public depart: Point;
    public arrivee: Point;

    public constructor(depart: Point, arrivee: Point) {
        this.depart = depart;
        this.arrivee = arrivee;
    }

    public get vecteur(): Vector2 {
        return new Vector2(this.differenceX, this.differenceY);
    }

    private get differenceX(): number {
        return this.arrivee.x - this.depart.x;
    }

    private get differenceY(): number {
        return this.arrivee.y - this.depart.y;
    }

}
