import { Group, Vector3 } from "three";
import { PointAffichage, RAYON_POINT } from "./pointAffichage";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "./Point";

export class IntersectionPiste extends Group {

    public droiteArrivee: DroiteAffichage;
    public point: PointAffichage;
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
        this.droiteArrivee.miseAJourArrivee(point);

        this.estDernierPointPlace
        ? this.droiteDebut.miseAJourPoint(point)
        : this.droiteDebut.miseAJourDepart(point);
    }

    public estEnContactAvec(autrePoint: Point): boolean {
        const droiteEntreCentre: Vector3 = this.point.point.vecteurPlanXZ.sub(autrePoint.vecteurPlanXZ);
        const DEUX: number = 2;

        return droiteEntreCentre.length() <= DEUX * RAYON_POINT;
    }

    public ramenerDroiteArrivee(): void {
        this.remove(this.droiteArrivee);
        this.droiteArrivee = new DroiteAffichage(this.point.point, this.point.point);
    }

    public ramenerDroiteDebut(): void {
        this.remove(this.droiteDebut);
        this.droiteDebut = new DroiteAffichage(this.point.point, this.point.point);
    }

    private get estDernierPointPlace(): boolean {
        return this.droiteDebut.droite.start === this.point.point.vecteurPlanXZ;
    }
}
