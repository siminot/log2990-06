import { Point } from "./Point";
import { Line3, Vector3 } from "three";

export class Droite extends Line3 {

    public constructor(depart: Point, arrivee: Point) {
        super(depart.vecteurPlanXZ, arrivee.vecteurPlanXZ);
    }

    public get plusPetitX(): number {
      return Math.min(this.start.x, this.end.x);
    }

    public get plusGrandX(): number {
      return Math.max(this.start.x, this.end.x);
    }

    public get plusPetitY(): number {
      return Math.min(this.start.z, this.end.z);
    }

    public get plusGrandY(): number {
      return Math.max(this.start.z, this.end.z);
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
            ? Math.acos(this.direction.dot(droite.direction.negate()) / (this.direction.length() * droite.direction.length()))
            : null;

    }

    public get boite(): Droite {
      return new Droite(new Point(this.plusPetitX, this.plusPetitY),
                        new Point(this.plusGrandX, this.plusGrandY));
    }

    public get pointFinalDroiteCentree(): Point {
      return new Point(this.end.x - this.start.x, this.end.z - this.start.z);
    }
}
