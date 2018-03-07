import { Group } from "three";
import { PointAffichage } from "./pointAffichage";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "./Point";

export class IntersectionPiste extends Group {

    private droiteArrivee: DroiteAffichage;
    private point: PointAffichage;
    public droiteDebut: DroiteAffichage;

    public constructor(droiteArrivee: DroiteAffichage, point: Point, estPremier: boolean) {
        super();
        this.point = new PointAffichage(point, estPremier);
        this.droiteArrivee = droiteArrivee;
        this.droiteDebut = new DroiteAffichage(point, point);
        this.ajouterElements();
    }

    private ajouterElements(): void {
        this.add(this.droiteArrivee);
        this.add(this.point);
        this.add(this.droiteDebut);
    }

    public miseAJourPoint(point: Point): void {
        this.point.point = point;
        this.droiteDebut.miseAJourDepart(point);
        this.droiteArrivee.miseAJourArrivee(point);
    }

    public deplacementPoint(point: Point): void {
        this.point.point = point;
        this.droiteDebut.miseAJourPoint(point);
        this.droiteArrivee.miseAJourPoint(point);
    }
}
