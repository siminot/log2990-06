import { IntersectionPiste } from "./intersectionPiste";
import { DroiteAffichage } from "./droiteAffichage";
import { RapportContraintes } from "../rapportContraintes";
import { LARGEUR_PISTE } from "./segmentPiste";

const RAPPORT_LONGUEUR_LARGEUR: number = 2;
const LONGUEUR_MINIMALE: number = LARGEUR_PISTE * RAPPORT_LONGUEUR_LARGEUR;
const RATIO_ANGLE: number = 4;
const ANGLE_MINIMAL: number = Math.PI / RATIO_ANGLE;
const ANGLE_AVANT: number = -1;
const ANGLE_APRES: number = 1;

export class VerificateurContraintesPiste {

    private rapports: Map<DroiteAffichage, RapportContraintes>;
    private readonly intersections: IntersectionPiste[];
    private intersectionEnCours: IntersectionPiste;

    public constructor(intersections: IntersectionPiste[]) {
        this.intersections = intersections;
        this.rapports = new Map<DroiteAffichage, RapportContraintes>();
        this.intersectionEnCours = null;
    }

    public verifierContraintes(intersection: IntersectionPiste): void {
        this.intersectionEnCours = intersection;
        this.verifierCroisement();
        this.verifierLongueurs();
        this.verifierAngleIntersectionCourante();
        this.miseAJourCouleur(this.intersectionEnCours);
    }

    private verifierLongueurs(): void {
        this.verifierLongueur(this.intersectionEnCours.droiteArrivee);
        this.verifierLongueur(this.intersectionEnCours.droiteDebut);
    }

    private verifierLongueur(droite: DroiteAffichage): void {
        droite.droite.distance() >= LONGUEUR_MINIMALE
            ? this.rapport(droite).longueurRespectee = true
            : this.rapport(droite).longueurRespectee = false;
    }

    private verifierAngleIntersectionCourante(): void {
        for (let i: number = ANGLE_AVANT ; i <= ANGLE_APRES ; i++) {
            this.verifierAngleAdjacent(i);
        }
    }

    private verifierAngleAdjacent(offset: number): void {
        const index: number  = (this.indexIntersectionCourante + offset + this.intersections.length) % this.intersections.length;

        if (this.indexEstValide(index)) {
            this.verifierAngle(this.intersections[index]);
            this.miseAJourCouleur(this.intersections[index]);
        }
    }

    private verifierAngle(intersection: IntersectionPiste): void {
        if (this.angleDroitesEnCours(intersection) === null || this.angleDroitesEnCours(intersection) >= ANGLE_MINIMAL) {
            this.rapport(intersection.droiteArrivee).angleArriveeRespectee = true;
            this.rapport(intersection.droiteDebut).angleDebutRespectee = true;
        } else {
            this.rapport(intersection.droiteArrivee).angleArriveeRespectee = false;
            this.rapport(intersection.droiteDebut).angleDebutRespectee = false;
        }
    }

    private angleDroitesEnCours(intersection: IntersectionPiste): number {
        return intersection.droiteArrivee.droite.angleAvecDroite(intersection.droiteDebut.droite);
    }

    private verifierCroisement(): void {
        for (const intersection of this.intersections) {
            this.verifierCroisementIntersection(intersection);
        }
    }

    private verifierCroisementIntersection(intersection: IntersectionPiste): void {
        for (const droiteAnalyse of intersection.droites) {
            for (const droiteEnCours of this.intersectionEnCours.droites) {
                if (droiteAnalyse !== droiteEnCours) { /*
                    if (droiteAnalyse.droite.croiseDroite(droiteEnCours.droite)) {
                        this.rapport(droiteAnalyse).ajouterCroisement(droiteEnCours);
                        this.rapport(droiteAnalyse).ajouterCroisement(droiteEnCours);
                    } else {
                        this.rapport(droiteAnalyse).retirerCroisement(droiteEnCours);
                        this.rapport(droiteAnalyse).retirerCroisement(droiteEnCours);
                    }*/
                }
            }
        }

        this.miseAJourCouleur(intersection);
    }

    private miseAJourCouleur(intersection: IntersectionPiste): void {
        this.miseAJourCouleurDroite(intersection.droiteArrivee);
        this.miseAJourCouleurDroite(intersection.droiteDebut);
    }

    private miseAJourCouleurDroite(droite: DroiteAffichage): void {
        this.rapport(droite).contraintesRespectees
            ? droite.respecteContraintes()
            : droite.briseContrainte();
    }

    public get pisteRespecteContraintes(): boolean {
        for (const intersection of this.intersections) {
            if (!this.rapport(intersection.droiteDebut).contraintesRespectees) {
                return false;
            }
        }

        return true;
    }

    private rapport(droite: DroiteAffichage): RapportContraintes {
        if (this.rapports.get(droite) === undefined) {
            this.rapports.set(droite, new RapportContraintes());
        }

        return this.rapports.get(droite);
    }

    private get indexIntersectionCourante(): number {
        return this.intersections.indexOf(this.intersectionEnCours);
    }

    private indexEstValide(index: number): boolean {
        return index >= 0 && index < this.intersections.length;
    }

}
