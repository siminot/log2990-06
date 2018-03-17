import { Point } from "./Point";
import { Line3, Vector3 } from "three";

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

    public get direction(): Vector3 {
        return this.end.clone().sub(this.start);
    }

    public angleAvecDroite(droite: Droite): number {
        return this.direction.length() * droite.direction.length() !== 0
            ? Math.acos(this.direction.dot(droite.direction) / (this.direction.length() * droite.direction.length()))
            : null;

    }

    public croiseDroite(droite: Droite): boolean {
        return true;
    }
}
