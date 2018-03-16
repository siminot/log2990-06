import { Vector3 } from "three";
import { Piste } from "./IPiste";
import { IPoint } from "./elementsGeometrie/IPoint";
import { Point } from "./elementsGeometrie/Point";
import { Droite } from "./elementsGeometrie/Droite";
import { SegmentPiste } from "./elementsGeometrie/segmentPiste";

export class PisteJeu extends Piste {

    protected intersections: IPoint[];

    public constructor(points: Point[]) {
        super();
        this.intersections = [];
        this.importerPiste(points);

    }

    public ajouterPoint(point: Point): void {
        this.add(new SegmentPiste(this.pointPrecedent(point), point));
    }

    public get zoneDeDepart(): Vector3 {
        const DEUX: number = 2;

        return this.intersections.length >= DEUX
            ? new Droite(this.premiereIntersection.point, this.intersections[1].point).getCenter()
            : null;
    }

    private pointPrecedent(point: IPoint): IPoint {
        return this.intersections.indexOf(point) >= 0
            ? this.intersections[(this.intersections.indexOf(point) - 1) % this.intersections.length]
            : null;
    }
}
