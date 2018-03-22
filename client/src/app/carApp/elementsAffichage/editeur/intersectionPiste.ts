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
        this.pointDroiteDebut = point;
        this.pointDroiteArrivee = point;
        this.pointAffichage.point = point;
    }

    private set pointDroiteDebut(point: Point) {
        this.estPointDuBout
            ? this.droiteDebut.point = point
            : this.droiteDebut.depart = point;
    }

    private set pointDroiteArrivee(point: Point) {
        this.estPremierPointPlace
            ? this.droiteArrivee.point = point
            : this.droiteArrivee.arrivee = point;
    }

    public constructor(droiteArrivee: DroiteAffichage, point: Point) {
        super();
        this.pointAffichage = new PointAffichage(point);
        this.droiteArrivee = droiteArrivee;
        this.droiteDebut = this.droiteAuPoint;
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

    public ramenerDroiteDepart(): void {
        this.remove(this.droiteDebut);
        this.droiteDebut = this.droiteAuPoint;
        this.add(this.droiteDebut);
    }

    public ramenerDroiteArrivee(): void {
        this.remove(this.droiteArrivee);
        this.droiteArrivee = this.droiteAuPoint;
        this.add(this.droiteArrivee);
    }

    public bouclerAvec(intersection: IntersectionPiste): void {
        let premiere: IntersectionPiste;
        let derniere: IntersectionPiste;

        if (this.estPointDuBout) {
            premiere = intersection;
            derniere = this;
        } else {
            premiere = this;
            derniere = intersection;
        }

        premiere.droiteArrivee = derniere.droiteDebut;
        derniere.droiteDebut.arrivee = premiere.point;
    }

    private get estPointDuBout(): boolean {
        return this.droiteDebut.droite.end.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }

    private get estPremierPointPlace(): boolean {
        return this.droiteArrivee.droite.start.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }

    private get droiteAuPoint(): DroiteAffichage {
        return new DroiteAffichage(this.point, this.point);
    }
}
