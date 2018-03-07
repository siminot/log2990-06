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

    public ajouterPoint(point: Point): void {
        if (!this.creationPremierPoint && this.premierPoint.estEnContactAvec(point)) {
            this.dernierElement.droiteDebut.miseAJourArrivee(point);
        } else {
            this.creerNouvelleIntersection(point);
        }
    }

    private creerNouvelleIntersection(point: Point): void {
        const intersection: IntersectionPiste = new IntersectionPiste(this.obtenirDroiteArriveeNouveauPoint(point),
                                                                      point, this.creationPremierPoint);
        this.elements.push(intersection);
        this.add(intersection);
    }

    private obtenirDroiteArriveeNouveauPoint(point: Point): DroiteAffichage {
        let droiteArrivee: DroiteAffichage;
        if (this.droiteArriveeCourante !== null) {
            droiteArrivee = this.droiteArriveeCourante;
            droiteArrivee.miseAJourArrivee(point);
        } else {
            droiteArrivee = new DroiteAffichage(point, point);
        }

        return droiteArrivee;
    }

    public fixerElement(point: Point): void {
        this.miseAJourElementCourant(point);
    }

    public miseAJourElementCourant(point: Point): void {
        this.creationPremierPoint
            ? this.dernierElement.deplacementPoint(point)
            : this.dernierElement.miseAJourPoint(point);
    }

    public effacerPoint(point: Point): void {
        if (!this.creationPremierPoint) {
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

    private get premierPoint(): IntersectionPiste {
        return this.elements[0];
    }
}
