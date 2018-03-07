import { Point } from "./point";
import { Line3 } from "three";

export class Droite extends Line3 {

    private _depart: Point;
    private _arrivee: Point;

    public constructor(depart: Point, arrivee: Point) {
        super(depart.vecteurPlanXZ, arrivee.vecteurPlanXZ);
        this._depart = depart;
        this._arrivee = arrivee;
    }

    public get depart(): Point {
        return this._depart;
    }

    public set depart(point: Point) {
        this._depart = point;
        this.start = point.vecteurPlanXZ;
    }

    public get arrivee(): Point {
        return this._arrivee;
    }

    public set arrivee(point: Point) {
        this._arrivee = point;
        this.start = point.vecteurPlanXZ;
    }
}
