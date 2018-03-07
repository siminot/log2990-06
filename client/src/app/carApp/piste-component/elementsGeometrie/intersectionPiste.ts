import { Group, Vector3 } from "three";
import { PointAffichage, RAYON_POINT } from "./pointAffichage";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "./Point";

export class IntersectionPiste extends Group {

    public droiteArrivee: DroiteAffichage;
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

    public estEnContactAvec(autrePoint: Point): boolean {
        console.log(this.point.point, autrePoint);
        const droiteEntreCentre: Vector3 = this.point.point.vecteurPlanXZ.sub(autrePoint.vecteurPlanXZ);
        console.log(droiteEntreCentre.length() <= RAYON_POINT);
        return droiteEntreCentre.length() <= RAYON_POINT;
    }
}
