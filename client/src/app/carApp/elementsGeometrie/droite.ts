import { Point } from "./point";
import { Line3, Vector3 } from "three";
import { IDroite } from "./IDroite";

export class Droite extends Line3 implements IDroite {

    public constructor(depart: Point, arrivee: Point) {
        super(depart.vecteurPlanXZ, arrivee.vecteurPlanXZ);
    }

    public angleAvecDroite(droite: Droite): number {
        return this.direction.length() * droite.direction.length() !== 0
            ? Math.acos(this.direction.dot(droite.direction) / (this.direction.length() * droite.direction.length()))
            : null;
    }

    public get depart(): Point {
        return new Point(this.start.x, this.start.z);
    }

    public set depart(point: Point) {
        this.start = point.vecteurPlanXZ;
    }

    public get arrivee(): Point {
        return new Point(this.end.x, this.end.z);
    }

    public set arrivee(point: Point) {
        this.end = point.vecteurPlanXZ;
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

    public get direction(): Vector3 {
        return this.end.clone().sub(this.start);
    }

    public get boite(): Droite {
      return new Droite(new Point(this.plusPetitX, this.plusPetitY),
                        new Point(this.plusGrandX, this.plusGrandY));
    }

    public get pointFinalDroiteCentree(): Point {
      return new Point(this.end.x - this.start.x, this.end.z - this.start.z);
    }
}
