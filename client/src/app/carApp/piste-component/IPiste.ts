import { Group } from "three";
import { IPoint } from "./elementsGeometrie/IPoint";

export abstract class Piste extends Group {

    protected intersections: IPoint[];

    public constructor() {
        super();
        this.intersections = [];
    }

    public importerPiste(points: IPoint[]): void {
        this.intersections.splice(0, this.intersections.length);

        for (const point of points) {
            this.ajouterPoint(point);
        }
    }

    public abstract ajouterPoint(point: IPoint): void;

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
