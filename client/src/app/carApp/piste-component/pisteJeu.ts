import { Piste } from "./IPiste";
import { IPoint } from "./elementsGeometrie/IPoint";
import { Point } from "./elementsGeometrie/Point";
import { Vector3 } from "three";
import { Droite } from "./elementsGeometrie/Droite";

export class PisteJeu extends Piste {

    protected intersections: IPoint[];

    public constructor(points: IPoint[]) {
        super();
        this.intersections = [];
        this.importerPiste(points);

    }

    public ajouterPoint(point: IPoint): void {
        return;
    }

    // Source : https://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order
    public estSensHoraire(): boolean {
        let somme: number = 0;
        for (let i: number = 0 ; i < this.intersections.length ; i++) {
            const pointActuel: Point = this.intersections[i].point;
            const pointSuivant: Point = this.intersections[(i + 1) % this.intersections.length].point;
            somme += (pointSuivant.x - pointActuel.x) * (pointSuivant.y + pointActuel.y);
        }

        return somme > 0;
    }

    public get zoneDeDepart(): Vector3 {
        const DEUX: number = 2;

        return this.intersections.length >= DEUX
            ? new Droite(this.premiereIntersection.point, this.intersections[1].point).getCenter()
            : null;
    }
}
