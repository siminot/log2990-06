import { Group, Vector3 } from "three";
import { IntersectionPiste } from "./elementsGeometrie/intersectionPiste";
import { Point } from "./elementsGeometrie/Point";
import { DroiteAffichage } from "./elementsGeometrie/droiteAffichage";
import { VerificateurContraintesPiste } from "./elementsGeometrie/verificateurContraintesPiste";

export class Piste extends Group {

    private intersections: IntersectionPiste[];
    private intersectionSelectionnee: IntersectionPiste;
    private verificateurPiste: VerificateurContraintesPiste;

    public constructor() {
        super();
        this.intersections = [];
        this.intersectionSelectionnee = null;
        this.verificateurPiste = new VerificateurContraintesPiste(this.intersections);
    }

    public importerPiste(points: Point[]): void {
        this.intersections.splice(0, this.intersections.length);

        for (const point of points) {
            this.ajouterPoint(point);
        }
    }

    public exporterPiste(): Point[] {
        if (this.verificateurPiste.pisteRespecteContraintes) {
            const points: Point[] = [];
            for (const intersection of this.intersections) {
                points.push(intersection.point.point);
            }

            return points;
        } else {
            return null;
        }
    }

    public ajouterPoint(point: Point): void {
        if (this.circuitEstBoucle) {
            return;
        } else if (this.doitFermerCircuit(point)) {
            this.bouclerCircuit();
        } else {
            this.creerNouvelleIntersection(point);
        }
    }

    private doitFermerCircuit(point: Point): boolean {
        const DEUX: number = 2;

        return this.intersections.length > DEUX &&
               this.premiereIntersection.estEnContactAvec(point);
    }

    private bouclerCircuit(): void {
        this.premiereIntersection.droiteArrivee = this.derniereIntersection.droiteDebut;
        this.derniereIntersection.droiteDebut.miseAJourArrivee(this.premiereIntersection.point.point);
        this.verifierContraintesExtremites();
    }

    private debouclerCircuit(): void {
        this.premiereIntersection.ramenerDroiteArrivee();
        this.derniereIntersection.ramenerDroiteDebut();
        this.verifierContraintesExtremites();
    }

    private verifierContraintesExtremites(): void {
        if (!this.creationPremierPoint) {
            this.verificateurPiste.verifierContraintes(this.premiereIntersection);
            this.verificateurPiste.verifierContraintes(this.derniereIntersection);
        }
    }

    private creerNouvelleIntersection(point: Point): void {
        if (!this.estEnContactAvecAutresPoints(point)) {
            this.ajouterIntersection(
                new IntersectionPiste(this.obtenirDroiteArriveeNouveauPoint(point), point, this.creationPremierPoint));
        }
    }

    private ajouterIntersection(intersection: IntersectionPiste): void {
        this.intersections.push(intersection);
        this.add(intersection);
        this.verificateurPiste.verifierContraintes(intersection);
    }

    private obtenirDroiteArriveeNouveauPoint(point: Point): DroiteAffichage {
        return this.droiteArriveeCourante !== null
            ? this.droiteArriveeCourante
            : new DroiteAffichage(point, point);
    }

    public miseAJourElementSelectionne(point: Point): void {
        if (this.intersectionSelectionnee !== null) {
            this.intersectionSelectionnee.miseAJourPoint(point);
            this.verificateurPiste.verifierContraintes(this.intersectionSelectionnee);
        }
    }

    public effacerPoint(point: Point): void {
        if (this.circuitEstBoucle) {
            this.debouclerCircuit();
        } else if (!this.creationPremierPoint) {
            this.remove(this.derniereIntersection);
            this.intersections.splice(-1);
            this.verifierContraintesExtremites();
        }
    }

    private get premiereIntersection(): IntersectionPiste {
        return !this.creationPremierPoint
            ? this.intersections[0]
            : null;
    }

    private get derniereIntersection(): IntersectionPiste {
        return this.intersections.length  >= 1
            ? this.intersections[this.intersections.length - 1]
            : null;
    }

    private get droiteArriveeCourante(): DroiteAffichage {
        return this.derniereIntersection !== null
         ? this.derniereIntersection.droiteDebut
         : null;
    }

    private get creationPremierPoint(): boolean {
        return this.intersections.length === 0;
    }

    public selectionnerIntersection(point: Point): void {
        for (const intersection of this.intersections) {
            if (intersection.estEnContactAvec(point)) {
                this.intersectionSelectionnee = intersection;

                return;
            }
        }

        this.intersectionSelectionnee = null;
    }

    public deselectionnerElement(): void {
        this.intersectionSelectionnee = null;
    }

    private estEnContactAvecAutresPoints(point: Point): boolean {
        for (const intersection of this.intersections) {
            if (intersection.estEnContactAvec(point)) {
                return true;
            }
        }

        return false;
    }

    // Source : https://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order
    public get estSensHoraire(): boolean {
        if (!this.circuitEstBoucle) {
            return null;
        }

        let somme: number = 0;
        for (let i: number = 0 ; i < this.intersections.length ; i++) {
            const pointActuel: Point = this.intersections[i].point.point;
            const pointSuivant: Point = this.intersections[(i + 1) % this.intersections.length].point.point;
            somme += (pointSuivant.x - pointActuel.x) * (pointSuivant.y + pointActuel.y);
        }

        return somme > 0;
    }

    public get zoneDeDepart(): Vector3 {
        const DEUX: number = 2;

        return this.intersections.length >= DEUX
            ? this.premiereIntersection.droiteDebut.droite.getCenter()
            : null;
    }

    private get circuitEstBoucle(): boolean {
        return this.premiereIntersection !== null && this.derniereIntersection !== null
            ? this.premiereIntersection.droiteArrivee === this.derniereIntersection.droiteDebut
            : false;

    }
}
