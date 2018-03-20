import { IntersectionPiste } from "./elementsGeometrie/intersectionPiste";
import { Point } from "./elementsGeometrie/Point";
import { DroiteAffichage } from "./elementsGeometrie/droiteAffichage";
import { VerificateurContraintesPiste } from "./elementsGeometrie/verificateurContraintesPiste";
import { PisteAbstraite } from "./pisteAbstraite";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

export class PisteEdition extends PisteAbstraite {

    protected intersections: IntersectionPiste[];
    private intersectionSelectionnee: IntersectionPiste;
    private verificateurPiste: VerificateurContraintesPiste;
    private _nombreDePoints: number;

    private _nbPointsSujet: BehaviorSubject<number>;
    private nbPointsObservable$: Observable<number>;

    public constructor() {
        super();
        this.intersections = [];
        this.intersectionSelectionnee = null;
        this.verificateurPiste = new VerificateurContraintesPiste(this.intersections);
        this._nombreDePoints = 0;
        this.initObservableNbPoints();
    }

    private initObservableNbPoints(): void {
        this._nbPointsSujet = new BehaviorSubject<number>(this._nombreDePoints);
        this.nbPointsObservable$ = this._nbPointsSujet.asObservable();
    }

    private envoieNbPoints(nbPoints: number): void {
        this._nbPointsSujet.next(nbPoints);
    }

    public receptionNbPoints(): Observable<number> {
        return this.nbPointsObservable$;
    }

    public exporterPiste(): Point[] {
      const points: Point[] = [];

      for (const intersection of this.intersections) {
           points.push(intersection.point);
      }

      return points;
    }

    public ajouterPoint(point: Point): void {
        if (this.estBoucle) {
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
        this.derniereIntersection.droiteDebut.miseAJourArrivee(this.premiereIntersection.point);
        this.verifierContraintesExtremites();
    }

    private debouclerCircuit(): void {
        this.premiereIntersection.ramenerDroiteArrivee();
        this.derniereIntersection.droiteDebut.miseAJourArrivee(this.derniereIntersection.point);
        this.verifierContraintesExtremites();
    }

    private verifierContraintesExtremites(): void {
        if (this.contientPoints) {
            this.verificateurPiste.verifierContraintes(this.premiereIntersection);
            this.verificateurPiste.verifierContraintes(this.derniereIntersection);
        }
    }

    private creerNouvelleIntersection(point: Point): void {
        if (!this.estEnContactAvecAutresPoints(point)) {
            this.ajouterIntersection(
                new IntersectionPiste(this.obtenirDroiteArriveeNouveauPoint(point), point, !this.contientPoints));
        }
    }

    private ajouterIntersection(intersection: IntersectionPiste): void {
        this.intersections.push(intersection);
        this.add(intersection);
        this.verificateurPiste.verifierContraintes(intersection);
        this._nombreDePoints++;
        this.envoieNbPoints(this._nombreDePoints);
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

    public effacerPoint(): void {
        if (this.estBoucle) {
            this.debouclerCircuit();
        } else if (this.contientPoints) {
            this.retirerDernierPoint();
        }
    }

    private retirerDernierPoint(): void {
        this.remove(this.derniereIntersection);
        this.intersections.splice(-1);

        if (this.contientPoints) {
            this.derniereIntersection.ramenerDroiteDepart();
            this.verifierContraintesExtremites();
        }

        this._nombreDePoints--;
        this.envoieNbPoints(this._nombreDePoints);
    }

    protected get premiereIntersection(): IntersectionPiste {
        return this.contientPoints
            ? this.intersections[0]
            : null;
    }

    protected get derniereIntersection(): IntersectionPiste {
        return this.contientPoints
            ? this.intersections[this.intersections.length - 1]
            : null;
    }

    private get droiteArriveeCourante(): DroiteAffichage {
        return this.derniereIntersection !== null
         ? this.derniereIntersection.droiteDebut
         : null;
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

    public get estBoucle(): boolean {
        return this.premiereIntersection !== null && this.derniereIntersection !== null
            ? this.premiereIntersection.droiteArrivee === this.derniereIntersection.droiteDebut
            : false;
    }

    public estSensHoraire(): boolean {
        return this.estBoucle
            ? super.estSensHoraire()
            : null;
    }
}
