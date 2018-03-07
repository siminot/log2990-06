import { Line, LineBasicMaterial, Geometry } from "three";
import { Droite } from "./droite";
import { Point } from "./Point";

const COULEUR_DROITE: number = 0xFF00FF;

export class DroiteAffichage extends Line {

    private _droite: Droite;

    public constructor(depart: Point, arrivee: Point) {
        super();
        this.droite = new Droite(depart, arrivee);
        this.material = new LineBasicMaterial({color: COULEUR_DROITE});
        this.geometry = new Geometry();
    }

    public set droite(droite: Droite) {
        this._droite = droite;
        this.miseAJourLine();

    }

    public miseAJourDepart(point: Point): void {
        this._droite.depart = point;
        this.miseAJourLine();
    }

    public miseAJourArrivee(point: Point): void {
        this._droite.arrivee = point;
        this.miseAJourLine();
    }

    private miseAJourLine(): void {
        this.geometry = new Geometry();
        this.geometry.vertices.push(this.droite.start, this.droite.end);
    }

}
