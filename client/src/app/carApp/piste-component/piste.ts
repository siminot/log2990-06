import { Group } from "three";
import { IntersectionPiste } from "./elementsGeometrie/intersectionPiste";
import { Point } from "./elementsGeometrie/Point";
import { DroiteAffichage } from "./elementsGeometrie/droiteAffichage";

export class Piste extends Group {

    private elements: IntersectionPiste[];

    public constructor() {
        super();
        this.elements = [];
    }

    public ajouterElement(point: Point): void {
        const droiteArrivee: DroiteAffichage = new DroiteAffichage(this.avantDernierPoint, this.dernierPoint);
        const intersection: IntersectionPiste = new IntersectionPiste(droiteArrivee, point, null);
        this.elements.push(intersection);
        this.add(intersection);
    }

    public fixerElement(point: Point): void {
        this.miseAJourElementCourant(point);
        this.ajouterElement(point);
    }

    public miseAJourElementCourant(point: Point): void {
        this.dernierElement.miseAJourPoint(point);
    }

    private get dernierPoint(): Point {
        return this.elements.length - 1 >= 0
            ? this.elements[this.elements.length - 1].point.point
            : null;
    }

    private get avantDernierPoint(): Point {
        return this.elements.length - 1 - 1 >= 0
            ? this.elements[this.elements.length - 1 - 1].point.point
            : null;
    }

    private get dernierElement(): IntersectionPiste {
        return this.elements.length >= 0
            ? this.elements[this.elements.length - 1]
            : null;
    }
}
