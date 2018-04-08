import { Vector3 } from "three";
import { IPoint } from "../elementsGeometrie/IPoint";
import { Point } from "../elementsGeometrie/point";
import { Droite } from "../elementsGeometrie/droite";
import { SegmentPiste } from "../elementsAffichage/jeu/segmentPiste";
import { PisteAbstraite } from "./pisteAbstraite";
import { LigneDeDepart } from "../elementsAffichage/jeu/ligneDepart";

export class PisteJeu extends PisteAbstraite {

    protected readonly intersections: IPoint[];
    private _premierSegment: SegmentPiste;

    public constructor() {
        super();
        this.intersections = [];
        this._premierSegment = null;
    }

    public importer(points: Point[]): void {
        if (this.intersections.length === 0 && points !== undefined) {
            for (const point of points) {
                this.ajouterPoint(point);
            }

            if (this.intersections.length > 0) {
                this.bouclerPiste();
                this.add(new LigneDeDepart(this.zoneDeDepart, this._premierSegment.angle));
            }
        }
    }

    public exporter(): Point[] {
        const piste: Point[] = super.exporter();
        const premierPoint: Point = piste[0];
        piste.splice(0, 1);
        piste.push(premierPoint);

        return this.estSensHoraire()
            ? piste.reverse()
            : piste;
    }

    public ajouterPoint(point: Point): void {
        this.intersections.push(point);

        if (this.intersections.length > 1) {
            const segment: SegmentPiste = new SegmentPiste(this.pointPrecedent(point), point);

            if (this._premierSegment === null) {
                this._premierSegment = segment;
            }

            this.add(segment);
        }
    }

    private bouclerPiste(): void {
        this.add(new SegmentPiste(this.intersections[this.intersections.length - 1].point, this.intersections[0].point));
    }

    public get zoneDeDepart(): Vector3 {
        const DEUX: number = 2;

        return this.intersections.length >= DEUX
            ? new Droite(this.premiereIntersection.point, this.intersections[1].point).getCenter()
            : null;
    }

    public get premierSegment(): SegmentPiste {
        return this._premierSegment;
    }

    public get estValide(): boolean {
        const NOMBRE_MINIMAL_SEGMENTS: number = 3;

        return this.intersections.length >= NOMBRE_MINIMAL_SEGMENTS;
    }

    private pointPrecedent(point: Point): Point {
        return this.intersections.indexOf(point) >= 1
            ? this.intersections[(this.intersections.indexOf(point) - 1) % this.intersections.length].point
            : null;
    }
}
