import { Vector3 } from "three";
import { Piste } from "./IPiste";
import { IPoint } from "./elementsGeometrie/IPoint";
import { Point } from "./elementsGeometrie/Point";
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

    public get zoneDeDepart(): Vector3 {
        const DEUX: number = 2;

        return this.intersections.length >= DEUX
            ? new Droite(this.premiereIntersection.point, this.intersections[1].point).getCenter()
            : null;
    }
}
