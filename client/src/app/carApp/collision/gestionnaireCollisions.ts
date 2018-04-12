import { Voiture } from "../voiture/voiture";
import { Injectable } from "@angular/core";
import { Vector3, Sphere} from "three";


const FACTEUR_AVANT: number = 1.1;
const FACTEUR_ARRIERE: number = -1;
const FACTEUR_MILIEU: number = 0;
const LARGEUR_AUTO: number = 0.8;
const SPHERE_AVANT: Vector3 = new Vector3(FACTEUR_AVANT, FACTEUR_AVANT, FACTEUR_AVANT);
const SPHERE_ARRIERE: Vector3 = new Vector3(FACTEUR_ARRIERE, FACTEUR_ARRIERE, FACTEUR_ARRIERE);
const SPHERE_MILIEU: Vector3 = new Vector3(FACTEUR_MILIEU, FACTEUR_MILIEU, FACTEUR_MILIEU);
const NOMBRE_SPHERE: number = 3;
const DISTANCE_CRITIQUE: number = 2;

@Injectable()
export class GestionnaireCollision {
    private arrayDeSphere: Array<Sphere[]>;
    private voitureJoueur: Voiture;
    private voituresAi: Voiture[];

    public constructor() {
        this.arrayDeSphere = new Array<Array<Sphere>>();
    }

    public creationShpere(): Sphere {
        const positionDepart: Vector3 = new Vector3(0, 0, 0);

        return new Sphere(positionDepart, LARGEUR_AUTO);
    }

    public miseAjour(voitureJoueur: Voiture, voituresAi: Voiture[]): void {
        this.miseAjourP(voitureJoueur, this.arrayDeSphere[0]);
        for (let i: number = 1; i < this.arrayDeSphere.length; i++) {
            this.miseAjourP(voituresAi[i - 1], this.arrayDeSphere[i]);
        }
    }

    private miseAjourP(voiture: Voiture, spheres: Array<Sphere>): void {
        const vecteurPlacement: Vector3[] = [SPHERE_ARRIERE, SPHERE_MILIEU, SPHERE_AVANT];
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            let directionTempo: Vector3 = voiture.getDirection().clone();
            let positionTempo: Vector3 = voiture.position.clone();
            directionTempo = directionTempo.multiply(vecteurPlacement[i]);
            positionTempo.add(directionTempo);
            spheres[i].center.set(positionTempo.x, positionTempo.y, positionTempo.z);
        }
    }

    public genererSphere(): Array<Sphere> {
        let tabTempo: Array<Sphere> = new Array<Sphere>();
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            let tempo: Sphere = this.creationShpere();
            tabTempo.push(tempo);
        }

        return tabTempo;
    }

    private insererSphereDansVoitureAI(voitures: Voiture[]): void {
        for (const _voiture of voitures) {
            this.arrayDeSphere.push(this.genererSphere());
        }
    }

    private insererSphereDansVoitureJoueur(voiture: Voiture): void {
        this.arrayDeSphere.push(this.genererSphere());
    }

    public insererSphereDansAutos(voitureJoueur: Voiture, voitureAi: Voiture[]): void {
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

    private observationZoneCritique ( spheresA: Array<Sphere>, spheresB: Array<Sphere>): void{
        for ( const sphereA of spheresA){
            let resolu: Boolean = false;
            for ( const sphereB of spheresB) {
                if (sphereA.intersectsSphere(sphereB)) {
                    this.resoudreContact(sphereA, sphereB, spheresA);
                    this.ajustementVitesseVoitures(spheresA, spheresB);
                    resolu = true;
                    break;
                }
            }
            if (resolu) {
                break;
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
        const indexAutoA: number = this.arrayDeSphere.indexOf(spheres);
        if ( indexAutoA === 0 ) {
            return this.voitureJoueur;
        } else {
            return this.voituresAi[indexAutoA - 1];
        }
    }

    private ajustementVitesseVoitures( spheresA: Array<Sphere>, spheresB: Array<Sphere>): void {
        const autoA: Voiture = this.retournerVoitureImpact(spheresA);
        const autoB: Voiture = this.retournerVoitureImpact(spheresB);

        const vitesseAutoA: Vector3 = autoA.vitesseEnWorld();
        const vitesseAutoB: Vector3 = autoB.vitesseEnWorld();

        const nouvelleVitesseA : Vector3 = this.calculeNouvelleVitesse(vitesseAutoA, autoA.position, vitesseAutoB, autoB.position);
        const nouvelleVitesseB : Vector3 = this.calculeNouvelleVitesse(vitesseAutoB, autoB.position, vitesseAutoA, autoB.position);

        autoA.vitesseEnLocal(this.ajustementFriction(nouvelleVitesseA, autoA));
        autoB.vitesseEnLocal(this.ajustementFriction(nouvelleVitesseB, autoB));

        // autoA.vitesseEnLocal(this.calculeNouvelleVitesse(vitesseAutoA, autoA.position, vitesseAutoB, autoB.position));
        // autoB.vitesseEnLocal(this.calculeNouvelleVitesse(vitesseAutoB, autoB.position, vitesseAutoA, autoB.position));

    }

    private calculeNouvelleVitesse( vecteurVitesseA: Vector3, vecteurPositionA: Vector3,
                                    vecteurVitesseB: Vector3, vecteurPositionB: Vector3): Vector3 {
        // Formule : https://en.wikipedia.org/wiki/Elastic_collision
        const soustractionVitesse: Vector3 = vecteurVitesseA.clone().sub(vecteurVitesseB);
        let soustractionPosition: Vector3 = vecteurPositionA.clone().sub(vecteurPositionB);
        let produitSclaire: number = soustractionVitesse.clone().dot(soustractionPosition);
        const denominateur: number = Math.pow(soustractionVitesse.clone().length(), 2);
        produitSclaire = produitSclaire / denominateur;
        soustractionPosition = soustractionPosition.multiplyScalar(produitSclaire);

        // return this.vitesseAutoToLocal(vecteurVitesseA.clone().sub(soustractionPosition));
        return vecteurVitesseA.clone().sub(soustractionPosition);

    }

    private ajustementFriction( vitesseAAjuster: Vector3, voiture: Voiture): Vector3 {
        return vitesseAAjuster.clone().projectOnVector(voiture.direction);

    }

}
