import { Group, Vector3 } from "three";
import { PointAffichage, RAYON_POINT } from "./pointAffichage";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "../../elementsGeometrie/point";
import { IPoint } from "../../elementsGeometrie/IPoint";

export class IntersectionPiste extends Group implements IPoint {

    public droiteArrivee: DroiteAffichage;
    private pointAffichage: PointAffichage;
    public droiteDebut: DroiteAffichage;

    public get droites(): DroiteAffichage[] {
        return [this.droiteArrivee, this.droiteDebut];
    }

    public get point(): Point {
        return this.pointAffichage.point;
    }

    public get x(): number {
        return this.point.x;
    }

    public get y(): number {
        return this.point.y;
    }

    public constructor(droiteArrivee: DroiteAffichage, point: Point) {
        super();
        this.pointAffichage = new PointAffichage(point);
        this.droiteArrivee = droiteArrivee;
        this.droiteDebut = new DroiteAffichage(point, point);
        this.miseAJourPoint(point);
        this.ajouterElements();
    }

    private ajouterElements(): void {
        this.add(this.droiteArrivee);
        this.add(this.pointAffichage);
        this.add(this.droiteDebut);
    }

    public marquerCommePremier(): void {
        this.pointAffichage.marquerCommePremier();
    }

    public miseAJourPoint(point: Point): void {
        this.estPointDuBout
            ? this.droiteDebut.miseAJourPoint(point)
            : this.droiteDebut.miseAJourDepart(point);

        this.estPremierPointPlace
            ? this.droiteArrivee.miseAJourPoint(point)
            : this.droiteArrivee.miseAJourArrivee(point);

        this.pointAffichage.point = point;
    }

    public estEnContactAvec(autrePoint: Point): boolean {
        const droiteEntreCentre: Vector3 = this.point.vecteurPlanXZ.sub(autrePoint.vecteurPlanXZ);
        const DEUX: number = 2;

        return droiteEntreCentre.length() <= DEUX * RAYON_POINT;
    }

    public ramenerDroiteArrivee(): void {
        this.remove(this.droiteArrivee);
        this.droiteArrivee = new DroiteAffichage(this.point, this.point);
        this.add(this.droiteArrivee);
    }

    public ramenerDroiteDepart(): void {
        this.remove(this.droiteDebut);
        this.droiteDebut = new DroiteAffichage(this.point, this.point);
        this.add(this.droiteDebut);
    }

    private get estPointDuBout(): boolean {
        return this.droiteDebut.droite.end.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }

    private get estPremierPointPlace(): boolean {
        return this.droiteArrivee.droite.start.clone().sub(this.point.vecteurPlanXZ).length() === 0;
    }
}
