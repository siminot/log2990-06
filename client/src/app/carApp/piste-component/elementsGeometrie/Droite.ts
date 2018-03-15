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
      return Math.min(this.start.y, this.end.y);
    }

    public get plusGrandY(): number {
      return Math.min(this.start.y, this.end.y);
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

    public croiseDroite(autreDroite: Droite): boolean {

      return true;
    }

    private get boite(): Droite {
      return new Droite(new Point(this.plusPetitX, this.plusPetitY),
                        new Point(this.plusGrandX, this.plusGrandY));
    }

    private boitesDroitesSeRecourbent(autreDroite: Droite): boolean {
      return this.boite.start.x <= autreDroite.boite.end.x
          && this.boite.end.x >= autreDroite.boite.start.x
          && this.boite.start.y <= autreDroite.boite.end.y
          && this.boite.end.y >= autreDroite.boite.start.y;
    }

    private get pointFinalDroiteCentree(): Point {
      return new Point(this.end.x - this.start.x, this.end.y - this.start.y);
    }

    private pointEstSurLigne(point: Point): boolean {
      const pointTemp: Point = new Point(point.x - this.plusPetitX, point.y -  this.plusPetitY);
      const DEGREE_ERREUR: number = 0.000001;

      return Math.abs(this.pointFinalDroiteCentree.produitVectoriel(pointTemp)) < DEGREE_ERREUR;
    }

}
