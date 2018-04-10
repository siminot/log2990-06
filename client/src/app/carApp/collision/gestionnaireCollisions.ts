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
        let positionDepart: Vector3 = new Vector3(0, 0, 0);

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
            console.log("creationSphere!");
            // scene.add(tempo);
        }

        return tabTempo;
    }

    private insererSphereDansVoitureAI(voitures: Voiture[]): void {
        for (const voiture of voitures) {
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
        for(const sphere of spheresB){
            if(sphereMilieuA.distanceToPoint(sphere.center) < DISTANCE_CRITIQUE) {
                this.observationZoneCritique(spheresA, spheresB);
            }
        }
    }

    private observationZoneCritique ( spheresA: Array<Sphere>, spheresB: Array<Sphere>): void{
        for ( let sphereA of spheresA){
            for ( let sphereB of spheresB) {
                if (sphereA.intersectsSphere(sphereB)) {
                    this.resoudreContact(spheresA, spheresB);
                }
            }
        }
    }

    private resoudreContact(spheresA: Array<Sphere>, spheresB: Array<Sphere>) {
        let distanceAReculer: Vector3 = new Vector3();
        for(let sphereA of spheresA){
            let distanceAAjouter: Vector3 = new Vector3();
            for(let sphereB of spheresB){
                sphereA.clampPoint(distanceAAjouter, sphereB.center);
                distanceAReculer.add(distanceAAjouter);
                console.log(distanceAAjouter.x, distanceAAjouter.y, distanceAAjouter.z);
            }
        }
        let i: number = this.arrayDeSphere.indexOf(spheresA);
        if ( i === 0) {
            let ajustement: Vector3 = new Vector3();
            // console.log(distanceAReculer.x, distanceAReculer.y, distanceAReculer.z);
            ajustement = this.voitureJoueur.position.sub(distanceAReculer);
            this.voitureJoueur.position.set(ajustement.x, ajustement.y, ajustement.z);
            // console.log("CONTACT!")
        }
    }



}
