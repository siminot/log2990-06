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
    private arrayDeSphere: Array<Sphere[]>;
    private voitureJoueur: Voiture;
    private voituresAi: Voiture[];

    public constructor(voitureJoueur: Voiture, voituresAi: Voiture[]) {
        this.arrayDeSphere = new Array<Array<Sphere>>();
        this.voituresAi = [];
        this.insererSphereDansAutos(voitureJoueur, voituresAi);
    }

    public miseAjour(voitureJoueur: Voiture, voituresAi: Voiture[]): void {
        this.miseAjourP(voitureJoueur, this.arrayDeSphere[0]);
        for (let i: number = 1; i < this.arrayDeSphere.length; i++) {
            this.miseAjourP(voituresAi[i - 1], this.arrayDeSphere[i]);
        }
        this.gestionCollision(voitureJoueur, voituresAi);
    }

    private miseAjourP(voiture: Voiture, spheres: Array<Sphere>): void {
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            let directionTempo: Vector3 = voiture.getDirection().clone();
            const positionTempo: Vector3 = voiture.position.clone();
            directionTempo = directionTempo.multiply(VECTEUR_PLACEMENT[i]);
            positionTempo.add(directionTempo);
            spheres[i].center.set(positionTempo.x, positionTempo.y, positionTempo.z);
        }
    }

    public genererSphere(): Array<Sphere> {
        const spheres: Array<Sphere> = new Array<Sphere>();
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            spheres.push(SPHERE.clone());
        }

        return spheres;
    }

    private insererSphereDansVoitureAI(voitures: Voiture[]): void {
        for (const _voiture of voitures) {
            this.arrayDeSphere.push(this.genererSphere());
        }
    }

    private insererSphereDansVoitureJoueur(voiture: Voiture): void {
        this.arrayDeSphere.push(this.genererSphere());
    }

    private insererSphereDansAutos(voitureJoueur: Voiture, voitureAi: Voiture[]): void {
        this.insererSphereDansVoitureJoueur(voitureJoueur);
        this.insererSphereDansVoitureAI(voitureAi);
    }

    public gestionCollision(voitureJoueur: Voiture, voitureAi: Voiture[]): void {
        this.voitureJoueur = voitureJoueur;
        this.voituresAi = voitureAi;
        for (let i: number = 0; i < this.arrayDeSphere.length; i++) {
            for ( let j: number = i + 1; j < this.arrayDeSphere.length; j++ ) {
                this.verifierPerimetrePriver(this.arrayDeSphere[i], this.arrayDeSphere[j]);
            }
        }
    }

    private verifierPerimetrePriver( spheresA: Array<Sphere>, spheresB: Array<Sphere>): void {
        const sphereMilieuA: Sphere = spheresA[1];
        for (const sphere of spheresB) {
            if (sphereMilieuA.distanceToPoint(sphere.center) < DISTANCE_CRITIQUE) {
                this.observationZoneCritique(spheresA, spheresB);
            }
        }
    }

    private observationZoneCritique ( spheresA: Array<Sphere>, spheresB: Array<Sphere>): void {
        for (const sphereA of spheresA) {
            for ( const sphereB of spheresB) {
                if (sphereA.intersectsSphere(sphereB)) {
                    this.resoudreContact(sphereA, sphereB, spheresA);
                    this.ajustementVitesseVoitures(spheresA, spheresB);

                    return;
                }
            }
        }
    }

    private resoudreContact(sphereA: Sphere, sphereB: Sphere, spheresA: Array<Sphere>): void {
            const voiture: Voiture = this.retournerVoitureImpact(spheresA);
            const boundAtoBcenter: number = sphereA.distanceToPoint(sphereB.center);
            const boundBtoAcenter: number = sphereB.distanceToPoint(sphereA.center);
            let vecteurAB: Vector3 = sphereB.center.clone().sub(sphereA.center).clone();
            const vecteurABnormaliser: Vector3 = vecteurAB.clone().normalize();

            const distance2: Vector3 = vecteurABnormaliser.clone().multiplyScalar(boundAtoBcenter);
            const distance1: Vector3 = vecteurABnormaliser.clone().multiplyScalar(boundBtoAcenter);

            vecteurAB = vecteurAB.sub(distance1);
            vecteurAB = vecteurAB.sub(distance2);
            this.reculerAuto(voiture, vecteurAB);
    }

    private reculerAuto(voiture: Voiture, distanceAReculer: Vector3): void {
        const ajustement: Vector3 = voiture.position.clone().sub(distanceAReculer);
        voiture.position.set(ajustement.x, ajustement.y, ajustement.z);
    }

    private retournerVoitureImpact( spheres: Array<Sphere>): Voiture {
        return this.arrayDeSphere.indexOf(spheres) === 0
            ? this.voitureJoueur
            : this.voituresAi[this.arrayDeSphere.indexOf(spheres) - 1];
    }

    private ajustementVitesseVoitures( spheresA: Array<Sphere>, spheresB: Array<Sphere>): void {
        const autoA: Voiture = this.retournerVoitureImpact(spheresA);
        const autoB: Voiture = this.retournerVoitureImpact(spheresB);

        const vitesseAutoA: Vector3 = autoA.vitesseEnWorld();
        const vitesseAutoB: Vector3 = autoB.vitesseEnWorld();

        const nouvelleVitesseA: Vector3 = this.calculeNouvelleVitesse(vitesseAutoA, autoA.position, vitesseAutoB, autoB.position);
        const nouvelleVitesseB: Vector3 = this.calculeNouvelleVitesse(vitesseAutoB, autoB.position, vitesseAutoA, autoB.position);

        autoA.vitesseEnLocal(this.ajustementFriction(nouvelleVitesseA, autoA));
        autoB.vitesseEnLocal(this.ajustementFriction(nouvelleVitesseB, autoB));
    }

    private calculeNouvelleVitesse( vecteurVitesseA: Vector3, vecteurPositionA: Vector3,
                                    vecteurVitesseB: Vector3, vecteurPositionB: Vector3): Vector3 {
        // Formule : https://en.wikipedia.org/wiki/Elastic_collision
        const soustractionVitesse: Vector3 = vecteurVitesseA.clone().sub(vecteurVitesseB);
        let soustractionPosition: Vector3 = vecteurPositionA.clone().sub(vecteurPositionB);
        let produitSclaire: number = soustractionVitesse.clone().dot(soustractionPosition);
        const DEUX: number = 2;
        const denominateur: number = Math.pow(soustractionVitesse.clone().length(), DEUX);
        produitSclaire = produitSclaire / denominateur;
        soustractionPosition = soustractionPosition.multiplyScalar(produitSclaire);

        return vecteurVitesseA.clone().sub(soustractionPosition);

    }

    private ajustementFriction(vitesseAAjuster: Vector3, voiture: Voiture): Vector3 {
        return vitesseAAjuster.clone().projectOnVector(voiture.direction);
    }

}
