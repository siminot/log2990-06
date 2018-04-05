import { Group } from "three";
import { IPoint } from "../elementsGeometrie/IPoint";
import { Point } from "../elementsGeometrie/point";

export abstract class PisteAbstraite extends Group {

    protected intersections: IPoint[];

    public constructor() {
        super();
        this.intersections = [];
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

    public abstract importer(piste: Point[]): void;
    public abstract ajouterPoint(point: IPoint): void;

    public exporter(): Point[] {
        const points: Point[] = [];

        for (const intersection of this.intersections) {
            points.push(intersection.point);
        }

        return points;
    }

    protected get premiereIntersection(): IPoint {
        return this.contientPoints
            ? this.intersections[0]
            : null;
    }

    protected get derniereIntersection(): IPoint {
        return this.contientPoints
            ? this.intersections[this.intersections.length - 1]
            : null;
    }

    protected get contientPoints(): boolean {
        return this.intersections.length > 0;
    }
}
