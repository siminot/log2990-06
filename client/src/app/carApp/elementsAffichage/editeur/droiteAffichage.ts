import { Line, LineBasicMaterial, Geometry } from "three";
import { Droite } from "../../elementsGeometrie/droite";
import { Point } from "../../elementsGeometrie/point";

export const COULEUR_DEFAUT: number = 0x0000FF;
export const COULEUR_CORRECTE: number = 0x00FF00;
export const COULEUR_ERREUR: number = 0xFF0000;

export class DroiteAffichage extends Line {

    private _droite: Droite;

    public get droite(): Droite {
        return this._droite;
    }

    public set depart(point: Point) {
        this._droite.depart = point;
        this.miseAJourGeometrie();
    }

    public set arrivee(point: Point) {
        this._droite.arrivee = point;
        this.miseAJourGeometrie();
    }

    public set point(point: Point) {
        this.depart = point;
        this.arrivee = point;
    }

    public constructor(depart: Point, arrivee: Point) {
        super();
        this._droite = new Droite(depart, arrivee);
        this.material = new LineBasicMaterial({color: COULEUR_DEFAUT});
        this.miseAJourGeometrie();
    }

    private miseAJourGeometrie(): void {
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
