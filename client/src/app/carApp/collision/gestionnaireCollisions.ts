import { Voiture } from "../voiture/voiture";
import { Vector3, Sphere} from "three";

const FACTEUR_AVANT: number = 1.1;
const FACTEUR_ARRIERE: number = -1;
const FACTEUR_MILIEU: number = 0;
const LARGEUR_AUTO: number = 0.8;

const SPHERE_AVANT: Vector3 = new Vector3(FACTEUR_AVANT, FACTEUR_AVANT, FACTEUR_AVANT);
const SPHERE_ARRIERE: Vector3 = new Vector3(FACTEUR_ARRIERE, FACTEUR_ARRIERE, FACTEUR_ARRIERE);
const SPHERE_MILIEU: Vector3 = new Vector3(FACTEUR_MILIEU, FACTEUR_MILIEU, FACTEUR_MILIEU);
const ORIGINE: Vector3 = new Vector3(0, 0, 0);
const SPHERE: Sphere = new Sphere(ORIGINE, LARGEUR_AUTO);

const VECTEUR_PLACEMENT: Vector3[] = [SPHERE_ARRIERE, SPHERE_MILIEU, SPHERE_AVANT];
const NOMBRE_SPHERE: number = 3;
const DISTANCE_CRITIQUE: number = 2;

export class GestionnaireCollision {
    private spheres: Map<Voiture, Sphere[]>;
    private voitures: Voiture[];

    public constructor(voitureJoueur: Voiture, voituresAi: Voiture[]) {
        this.spheres = new Map<Voiture, Sphere[]>();
        this.voitures = voituresAi.concat([voitureJoueur]);
        this.insererSphereDansVoitures();
    }

    public miseAjour(): void {
        for (const voiture of this.voitures) {
            this.miseAjourSpheresVoiture(voiture);
        }
        this.gestionCollision();
    }

    private miseAjourSpheresVoiture(voiture: Voiture): void {
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            const positionTempo: Vector3 = voiture.position.clone().add(voiture.getDirection().clone().multiply(VECTEUR_PLACEMENT[i]));
            this.spheres.get(voiture)[i].center.set(positionTempo.x, positionTempo.y, positionTempo.z);
        }
    }

    private genererSphere(): Sphere[] {
        const spheres: Sphere[] = [];
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            spheres.push(SPHERE.clone());
        }

        return spheres;
    }

    private insererSphereDansVoitures(): void {
        for (const voiture of this.voitures) {
            this.spheres.set(voiture, this.genererSphere());
        }
    }

    private gestionCollision(): void {
        for (let i: number = 0; i < this.voitures.length; i++) {
            for (let j: number = i + 1; j < this.voitures.length; j++) {
                this.verifierPerimetrePriver(this.spheres.get(this.voitures[j]), this.spheres.get(this.voitures[i]));
            }
        }
    }

    private verifierPerimetrePriver(spheresA: Array<Sphere>, spheresB: Array<Sphere>): void {
        for (const sphere of spheresB) {
            if (spheresA[1].distanceToPoint(sphere.center) < DISTANCE_CRITIQUE) {
                this.observationZoneCritique(spheresA, spheresB);
            }
        }
    }

    private observationZoneCritique(spheresA: Array<Sphere>, spheresB: Array<Sphere>): void {
        for (const sphereA of spheresA) {
            for ( const sphereB of spheresB) {
                if (sphereA.intersectsSphere(sphereB)) {
                    this.resoudreContact(sphereA, sphereB, spheresA);
                    this.ajustementVitesseVoitures(this.retournerVoitureImpact(spheresA), this.retournerVoitureImpact(spheresB));

                    return;
                }
            }
        }
    }

    private resoudreContact(sphereA: Sphere, sphereB: Sphere, spheresA: Array<Sphere>): void {
        const voiture: Voiture = this.retournerVoitureImpact(spheresA);
        const vecteurAB: Vector3 = sphereB.center.clone().sub(sphereA.center).clone();
        const distance1: Vector3 = vecteurAB.clone().normalize().multiplyScalar(sphereB.distanceToPoint(sphereA.center));
        const distance2: Vector3 = vecteurAB.clone().normalize().multiplyScalar(sphereA.distanceToPoint(sphereB.center));
        this.reculerAuto(voiture, vecteurAB.sub(distance1).sub(distance2));
    }

    private reculerAuto(voiture: Voiture, distanceAReculer: Vector3): void {
        const ajustement: Vector3 = voiture.position.clone().sub(distanceAReculer);
        voiture.position.set(ajustement.x, ajustement.y, ajustement.z);
    }

    private retournerVoitureImpact(spheres: Array<Sphere>): Voiture {
        for (const voiture of this.voitures) {
            if (this.spheres.get(voiture) === spheres) {
                return voiture;
            }
        }

        return null;
    }

    private ajustementVitesseVoitures(autoA: Voiture, autoB: Voiture): void {
        const nouvelleVitesseA: Vector3 = this.calculeNouvelleVitesse(autoA, autoB);
        const nouvelleVitesseB: Vector3 = this.calculeNouvelleVitesse(autoB, autoA);

        autoA.vitesseEnLocal(this.ajustementFriction(nouvelleVitesseA, autoA));
        autoB.vitesseEnLocal(this.ajustementFriction(nouvelleVitesseB, autoB));
    }

    private calculeNouvelleVitesse(autoA: Voiture, autoB: Voiture): Vector3 {
        // Formule : https://en.wikipedia.org/wiki/Elastic_collision
        const soustractionVitesse: Vector3 = autoA.vitesseEnWorld().clone().sub(autoB.vitesseEnWorld());
        let soustractionPosition: Vector3 = autoA.position.clone().sub(autoB.position);
        let produitSclaire: number = soustractionVitesse.clone().dot(soustractionPosition);
        const DEUX: number = 2;
        const denominateur: number = Math.pow(soustractionVitesse.clone().length(), DEUX);
        produitSclaire = produitSclaire / denominateur;
        soustractionPosition = soustractionPosition.multiplyScalar(produitSclaire);

        return autoA.vitesseEnWorld().clone().sub(soustractionPosition);
    }

    private ajustementFriction(vitesseAAjuster: Vector3, voiture: Voiture): Vector3 {
        return vitesseAAjuster.clone().projectOnVector(voiture.direction);
    }
}
