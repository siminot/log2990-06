import { Voiture } from "../voiture/voiture";
import { Injectable } from "@angular/core";
import { Vector3, Scene, Sphere} from "three";


// const LONGEUR_AUTO: number = 1.7000000476837158;
const FACTEUR_AVANT: number = 1.1;
const FACTEUR_ARRIERE: number = -1;
const FACTEUR_MILIEU: number = 0;
const LARGEUR_AUTO: number = 0.8;
const SPHERE_AVANT: Vector3 = new Vector3(FACTEUR_AVANT, FACTEUR_AVANT, FACTEUR_AVANT);
const SPHERE_ARRIERE: Vector3 = new Vector3(FACTEUR_ARRIERE, FACTEUR_ARRIERE, FACTEUR_ARRIERE);
const SPHERE_MILIEU: Vector3 = new Vector3(FACTEUR_MILIEU, FACTEUR_MILIEU, FACTEUR_MILIEU);
const NOMBRE_SPHERE: number = 3;
const DISTANCE_CRITIQUE: number = 2;
// const HAUTEUR_AUTO: number = 0.550000011920929;
@Injectable()
export class GestionnaireCollision {

    // private position: Vector3;
    // private direction: Vector3;
    private arrayDeSphere: Array<Sphere[]>;
    // private longueurVoiture: number;
    public constructor() {
        this.arrayDeSphere = new Array<Array<Sphere>>();
    }

    public creationShpere(): Sphere {
        // let geometry: SphereGeometry = new SphereGeome try(LARGEUR_AUTO, 32, 32);
        // let material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0xffff00 });
        let positionDepart: Vector3 = new Vector3(0,0,0);

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

    public verifierPerimetreContact(): void{
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
                console.log("DANGER DANGER");
            }
        }
    }
}
