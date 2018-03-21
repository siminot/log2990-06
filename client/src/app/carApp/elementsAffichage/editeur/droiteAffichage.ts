import { Line, LineBasicMaterial, Geometry } from "three";
import { Droite } from "../../elementsGeometrie/droite";
import { Point } from "../../elementsGeometrie/point";

const COULEUR_DEFAUT: number = 0x0000FF;
const COULEUR_CORRECTE: number = 0x00FF00;
const COULEUR_ERREUR: number = 0xFF0000;

export class DroiteAffichage extends Line {

    private _droite: Droite;

    public get droite(): Droite {
        return this._droite;
    }

    public constructor(depart: Point, arrivee: Point) {
        super();
        this._droite = new Droite(depart, arrivee);
        this.material = new LineBasicMaterial({color: COULEUR_DEFAUT});
        this.geometry = new Geometry();
    }

    public miseAJourDepart(point: Point): void {
        this._droite.modifierDepart(point);
        this.miseAJour();
    }

    public miseAJourArrivee(point: Point): void {
        this._droite.modifierArrivee(point);
        this.miseAJour();
    }

    public miseAJourPoint(point: Point): void {
        this.miseAJourDepart(point);
        this.miseAJourArrivee(point);
        this.miseAJour();
    }

    private miseAJour(): void {
        this.geometry = new Geometry();
        this.geometry.vertices.push(this._droite.start, this._droite.end);
    }

    public respecteContraintes(): void {
        this.material = new LineBasicMaterial({color: COULEUR_CORRECTE});
    }

    public briseContrainte(): void {
        this.material = new LineBasicMaterial({color: COULEUR_ERREUR});
    }

}
