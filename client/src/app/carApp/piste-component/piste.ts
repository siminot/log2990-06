import { Group } from "three";
import { IntersectionPiste } from "./elementsGeometrie/intersectionPiste";
import { Point } from "./elementsGeometrie/Point";
import { DroiteAffichage } from "./elementsGeometrie/droiteAffichage";

const ORIGINE: Point = new Point(0, 0);

export class Piste extends Group {

    private elements: IntersectionPiste[];

    public constructor() {
        super();
        this.elements = [];
        this.ajouterElement(ORIGINE);
    }

    private ajouterElement(point: Point): void {
        let droiteArrivee: DroiteAffichage;
        if (this.droiteArriveeCourante !== null) {
            droiteArrivee = this.droiteArriveeCourante;
            droiteArrivee.miseAJourArrivee(point);
        } else {
            droiteArrivee = new DroiteAffichage(point, point);
         }

        const intersection: IntersectionPiste = new IntersectionPiste(droiteArrivee, point, this.creationPremierPoint);
        this.elements.push(intersection);
        this.add(intersection);
    }

    public fixerElement(point: Point): void {
        this.miseAJourElementCourant(point);
        this.ajouterElement(point);
    }

    public miseAJourElementCourant(point: Point): void {
        this.placementPremierPoint
            ? this.dernierElement.deplacementPoint(point)
            : this.dernierElement.miseAJourPoint(point);
    }

    public effacerPoint(point: Point): void {
        if (this.elements.length > 1) {
            this.remove(this.dernierElement);
            this.elements.splice(-1);
        }
    }

    private get dernierElement(): IntersectionPiste {
        return this.elements.length - 1 >= 0
            ? this.elements[this.elements.length - 1]
            : null;
    }

    private get droiteArriveeCourante(): DroiteAffichage {
        return this.dernierElement !== null
         ? this.dernierElement.droiteDebut
         : null;
    }

    private get creationPremierPoint(): boolean {
        return this.elements.length === 0;
    }

    private get placementPremierPoint(): boolean {
        return this.elements.length === 1;
    }
}
