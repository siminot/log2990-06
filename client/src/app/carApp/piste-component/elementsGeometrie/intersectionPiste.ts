import { Group } from "three";
import { PointAffichage } from "./pointAffichage";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "./Point";

export class IntersectionPiste extends Group {

    private _point: PointAffichage;
    private _droiteArrivee: DroiteAffichage;
    private _droiteDebut: DroiteAffichage;

    public constructor(droiteArrivee: DroiteAffichage, point: Point, droiteDebut: DroiteAffichage) {
        super();
        this.point = new PointAffichage(point);
        this.droiteArrivee = droiteArrivee;
        this.droiteDebut = droiteDebut;
        this.ajouterElements();
    }

    public set droiteArrivee(droite: DroiteAffichage) {
        this.remove(this._droiteArrivee);
        this.droiteArrivee = droite;
        this.ajouterDroiteArrivee();
    }

    public set point(point: PointAffichage) {
        this.remove(this._point);
        this._point = point;
        this.ajouterPoint();
    }

    public set droiteDebut(droite: DroiteAffichage) {
        this.remove(this._droiteDebut);
        this._droiteDebut = droite;
        this.ajouterDroiteArrivee();
    }

    private ajouterElements(): void {
        this.ajouterDroiteArrivee();
        this.ajouterPoint();
        this.ajouterDroiteDebut();
    }

    private ajouterDroiteArrivee(): void {
        if (this.droiteArrivee !== null) {
            this.add(this.droiteArrivee);
        }
    }

    private ajouterPoint(): void {
        this.add(this._point);
    }

    private ajouterDroiteDebut(): void {
        if (this.droiteDebut !== null) {
            this.add(this.droiteDebut);
        }
    }

    public miseAJourPoint(point: Point): void {
        if (this.point !== null) {
            this.point.point = point;
        }

        if (this.droiteDebut !== null) {
            this.droiteDebut.miseAJourDepart(point);
        }

        if (this.droiteArrivee !== null) {
            this.droiteArrivee.miseAJourArrivee(point);
        }
    }
}
