import { Group } from "three";
import { IntersectionPiste } from "./elementsGeometrie/intersectionPiste";
import { Point } from "./elementsGeometrie/Point";
import { DroiteAffichage } from "./elementsGeometrie/droiteAffichage";

export class Piste extends Group {

    private elements: IntersectionPiste[];
    private circuitBoucle: boolean;
    private intersectionSelectionnee: IntersectionPiste;

    public constructor() {
        super();
        this.elements = [];
        this.circuitBoucle = false;
        this.intersectionSelectionnee = null;
    }

    public ajouterPoint(point: Point): void {
        if (this.circuitBoucle) {
            return;
        } else if (this.doitFermerCircuit(point)) {
            this.bouclerCircuit();
        } else {
            this.creerNouvelleIntersection(point);
        }
    }

    private doitFermerCircuit(point: Point): boolean {
        return !this.creationPremierPoint && this.premiereIntersection.estEnContactAvec(point);
    }

    private bouclerCircuit(): void {
        this.circuitBoucle = true;
        this.premiereIntersection.droiteArrivee = this.derniereIntersection.droiteDebut;
        this.premiereIntersection.droiteArrivee.miseAJourDepart(this.premierPoint);
    }

    private debouclerCircuit(): void {
        this.circuitBoucle = false;
        this.premiereIntersection.ramenerDroiteArrivee();
        this.derniereIntersection.ramenerDroiteDebut();
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

    public miseAJourElementSelectionne(point: Point): void {
        if (this.intersectionSelectionnee !== null) {
            this.derniereIntersection.miseAJourPoint(point);
        }
    }

    public effacerPoint(point: Point): void {
        if (this.circuitBoucle) {
            this.debouclerCircuit();
        } else if (!this.creationPremierPoint) {
            this.remove(this.derniereIntersection);
            this.elements.splice(-1);
        }
    }

    private get premiereIntersection(): IntersectionPiste {
        return this.elements[0];
    }

    private get derniereIntersection(): IntersectionPiste {
        return this.elements.length - 1 >= 0
            ? this.elements[this.elements.length - 1]
            : null;
    }

    private get droiteArriveeCourante(): DroiteAffichage {
        return this.derniereIntersection !== null
         ? this.derniereIntersection.droiteDebut
         : null;
    }

    private get creationPremierPoint(): boolean {
        return this.elements.length === 0;
    }

    private get premierPoint(): Point {
        return this.premiereIntersection.point.point;
    }

    public selectionnerIntersection(point: Point): void {
        for (const intersection of this.elements) {
            if (intersection.estEnContactAvec(point)) {
                this.intersectionSelectionnee = intersection;
                console.log(this.intersectionSelectionnee);
                return;
            }
        }

        this.intersectionSelectionnee = null;
        console.log(this.intersectionSelectionnee);
    }
}
