import { IntersectionPiste } from "./intersectionPiste";
import { DroiteAffichage } from "./droiteAffichage";
import { RapportContraintes } from "../rapportContraintes";
import { PI_OVER_2 } from "../../constants";

const LARGEUR_PISTE: number = 5;
const RAPPORT_LONGUEUR_LARGEUR: number = 2;
const LONGUEUR_MINIMALE: number = LARGEUR_PISTE * RAPPORT_LONGUEUR_LARGEUR;
const ANGLE_MINIMAL: number = PI_OVER_2;

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
        this.verifierAngle();
        this.verifierLongueurs();
        this.miseAJourCouleur();
    }

    private verifierLongueurs(): void {
        this.verifierLongueur(this.intersectionEnCours.droiteArrivee);
        this.verifierLongueur(this.intersectionEnCours.droiteDebut);
    }

    private verifierLongueur(droite: DroiteAffichage): void {
        droite.droite.distance() >= LONGUEUR_MINIMALE
            ? this.rapport(droite).angleRespectee = true
            : this.rapport(droite).angleRespectee = false;
    }

    private verifierAngle(): void {
        if (this.angleDroitesEnCours < ANGLE_MINIMAL) {
            this.rapport(this.intersectionEnCours.droiteArrivee).angleRespectee = false;
            this.rapport(this.intersectionEnCours.droiteDebut).angleRespectee = false;
        } else {
            this.rapport(this.intersectionEnCours.droiteArrivee).angleRespectee = false;
            this.rapport(this.intersectionEnCours.droiteDebut).angleRespectee = false;
        }
    }

    private get angleDroitesEnCours(): number {
        return this.intersectionEnCours.droiteArrivee.droite.angleAvecDroite(this.intersectionEnCours.droiteDebut.droite);
    }

    private miseAJourCouleur(): void {
        this.miseAJourCouleurDroite(this.intersectionEnCours.droiteArrivee);
        this.miseAJourCouleurDroite(this.intersectionEnCours.droiteDebut);
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

}
