import { Vector3 } from "three";
import { IPoint } from "../elementsGeometrie/IPoint";
import { Point } from "../elementsGeometrie/point";
import { Droite } from "../elementsGeometrie/droite";
import { SegmentPiste } from "../elementsAffichage/jeu/segmentPiste";
import { PisteAbstraite } from "./pisteAbstraite";
import { LigneDeDepart } from "../elementsAffichage/jeu/ligneDepart";

export class PisteJeu extends PisteAbstraite {

    protected readonly intersections: IPoint[];
    private premierSegment: SegmentPiste;

    public constructor() {
        super();
        this.intersections = [];
        this.premierSegment = null;
    }

    public importerPiste(points: Point[]): void {
        for (const point of points) {
            this.ajouterPoint(point);
        }

        this.bouclerPiste();
        this.add(new LigneDeDepart(this.zoneDeDepart, this.premierSegment.angle));
    }

    public ajouterPoint(point: Point): void {
        this.intersections.push(point);

        if (this.intersections.length > 1) {
            const segment: SegmentPiste = new SegmentPiste(this.pointPrecedent(point), point);

            if (this.premierSegment === null) {
                this.premierSegment = segment;
            }

            this.add(segment);
        }
    }

    public bouclerPiste(): void {
        this.add(new SegmentPiste(this.intersections[this.intersections.length - 1].point, this.intersections[0].point));
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
}
