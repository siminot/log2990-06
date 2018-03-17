import { Vector3 } from "three";
import { Piste } from "./IPiste";
import { IPoint } from "./elementsGeometrie/IPoint";
import { Point } from "./elementsGeometrie/Point";
import { Droite } from "./elementsGeometrie/Droite";
import { SegmentPiste, Hauteur } from "./elementsGeometrie/segmentPiste";

export class PisteJeu extends Piste {

    protected readonly intersections: IPoint[];

    public constructor() {
        super();
        this.intersections = [];
    }

    public importerPiste(points: Point[]): void {
        for (const point of points) {
            this.ajouterPoint(point);
        }

        this.bouclerPiste();
    }

    public ajouterPoint(point: Point): void {
        this.intersections.push(point);

        if (this.intersections.length > 1) {
            this.add(new SegmentPiste(this.pointPrecedent(point), point, this.hauteur));
        }
    }

    public bouclerPiste(): void {
        this.add(new SegmentPiste(this.intersections[this.intersections.length - 1].point, this.intersections[0].point, Hauteur.MOYENNE));
    }

    public get zoneDeDepart(): Vector3 {
        const DEUX: number = 2;

        return this.intersections.length >= DEUX
            ? new Droite(this.premiereIntersection.point, this.intersections[1].point).getCenter()
            : null;
    }

    private pointPrecedent(point: Point): Point {
        return this.intersections.indexOf(point) >= 1
            ? this.intersections[(this.intersections.indexOf(point) - 1) % this.intersections.length].point
            : null;
    }

    private get segmentPair(): boolean {
        const DEUX: number = 2;

        return this.children.length % DEUX === 0;
    }

    private get hauteur(): Hauteur {
        return this.segmentPair
            ? Hauteur.BASSE
            : Hauteur.ELEVEE;
    }
}
