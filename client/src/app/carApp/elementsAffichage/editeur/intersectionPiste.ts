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

    public bouclerAvec(intersection: IntersectionPiste): void {
        if (this.peutBouclerAvec(intersection)) {
            this.relier(intersection);
        } else if (intersection.peutBouclerAvec(this)) {
            intersection.relier(this);
        }
    }

    private peutBouclerAvec(intersection: IntersectionPiste): boolean {
        return this.estPointDuBout && intersection.estPremierPointPlace;
    }

    private relier(intersection: IntersectionPiste): void {
        intersection.droiteArrivee = this.droiteDebut;
        this.droiteDebut.arrivee = intersection.point;
    }

    public separer(intersection: IntersectionPiste): void {
        if (this.pointeVers(intersection)) {
            this.couperLienVers(intersection);
        } else if (intersection.pointeVers(this)) {
            intersection.couperLienVers(this);
        }
    }

    private pointeVers(intersection: IntersectionPiste): boolean {
        return this.droiteDebut.droite.end.equals(intersection.point.vecteurPlanXZ);
    }

    private couperLienVers(intersection: IntersectionPiste): void {
        intersection.ramenerDroiteArrivee();
        this.ramenerDroiteDepart();
    }

    public ramenerDroiteDepart(): void {
        this.remove(this.droiteDebut);
        this.droiteDebut = this.droiteAuPoint;
        this.add(this.droiteDebut);
    }

    private ramenerDroiteArrivee(): void {
        this.remove(this.droiteArrivee);
        this.droiteArrivee = this.droiteAuPoint;
        this.add(this.droiteArrivee);
    }

    private get estPointDuBout(): boolean {
        return this.droiteDebut.droite.end.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }

    private get estPremierPointPlace(): boolean {
        return this.droiteArrivee.depart.clone().sub(this.point).length() === 0;
    }

    private get droiteAuPoint(): DroiteAffichage {
        return new DroiteAffichage(this.point, this.point);
    }
}
