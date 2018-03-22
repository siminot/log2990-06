import { Group } from "three";
import { PointAffichage, RAYON_POINT } from "./pointAffichage";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "../../elementsGeometrie/point";
import { IPoint } from "../../elementsGeometrie/IPoint";

export class IntersectionPiste extends Group implements IPoint {

    public droiteArrivee: DroiteAffichage;
    private pointAffichage: PointAffichage;
    public droiteDebut: DroiteAffichage;

    public get point(): Point {
        return this.pointAffichage.point;
    }

    public set point(point: Point) {
        this.miseAJourDroiteDebut(point);
        this.miseAJourDroiteArrivee(point);
        this.pointAffichage.point = point;
    }

    public constructor(droiteArrivee: DroiteAffichage, point: Point) {
        super();
        this.pointAffichage = new PointAffichage(point);
        this.droiteArrivee = droiteArrivee;
        this.droiteDebut = new DroiteAffichage(point, point);
        this.point = point;
        this.ajouterElements();

        if (this.estPremierPointPlace) {
            this.pointAffichage.marquerCommePremier();
        }
    }

    private ajouterElements(): void {
        this.add(this.droiteArrivee);
        this.add(this.pointAffichage);
        this.add(this.droiteDebut);
    }

    public estEnContactAvec(autrePoint: Point): boolean {
        const DEUX: number = 2;

        return this.point.vecteurPlanXZ.sub(autrePoint.vecteurPlanXZ).length() <= DEUX * RAYON_POINT;
    }

    private miseAJourDroiteDebut(point: Point): void {
        this.estPointDuBout
            ? this.droiteDebut.point = point
            : this.droiteDebut.depart = point;
    }

    private miseAJourDroiteArrivee(point: Point): void {
        this.estPremierPointPlace
            ? this.droiteArrivee.point = point
            : this.droiteArrivee.arrivee = point;
    }

    public ramenerDroiteDepart(): void {
        this.remove(this.droiteDebut);
        this.droiteDebut = new DroiteAffichage(this.point, this.point);
        this.add(this.droiteDebut);
    }

    public ramenerDroiteArrivee(): void {
        this.remove(this.droiteArrivee);
        this.droiteArrivee = new DroiteAffichage(this.point, this.point);
        this.add(this.droiteArrivee);
    }

    private get estPointDuBout(): boolean {
        return this.droiteDebut.droite.end.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }

    private get estPremierPointPlace(): boolean {
        return this.droiteArrivee.droite.start.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }
}
