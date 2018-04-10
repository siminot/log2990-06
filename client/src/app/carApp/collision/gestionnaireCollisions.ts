import { Voiture } from "../voiture/voiture";
import { Injectable } from "@angular/core";
import { Mesh, Vector3, Scene, SphereGeometry, MeshBasicMaterial} from "three";

// const LONGEUR_AUTO: number = 1.7000000476837158;
const FACTEUR_AVANT: number = 1.1;
const FACTEUR_ARRIERE: number = -1;
const FACTEUR_MILIEU: number = 0;
const LARGEUR_AUTO: number = 0.8;
const SPHERE_AVANT: Vector3 = new Vector3(FACTEUR_AVANT, FACTEUR_AVANT, FACTEUR_AVANT);
const SPHERE_ARRIERE: Vector3 = new Vector3(FACTEUR_ARRIERE, FACTEUR_ARRIERE, FACTEUR_ARRIERE);
const SPHERE_MILIEU: Vector3 = new Vector3(FACTEUR_MILIEU, FACTEUR_MILIEU, FACTEUR_MILIEU);
const NOMBRE_SPHERE: number = 3;
// const HAUTEUR_AUTO: number = 0.550000011920929;
@Injectable()
export class GestionnaireCollision {

    // private position: Vector3;
    // private direction: Vector3;
    private arrayDeSphere: Array<Mesh[]>;
    private sphere: Mesh;

    // private longueurVoiture: number;
    public constructor() {
        this.arrayDeSphere = new Array<Array<Mesh>>();
    }

    public creationShpere(): Mesh {
        let geometry: SphereGeometry = new SphereGeometry(LARGEUR_AUTO, 32, 32);
        let material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0xffff00 });

        return new Mesh(geometry, material);
    }

    public miseAjour(voitureJoueur: Voiture, voituresAi: Voiture[]): void {
        this.miseAjourP(voitureJoueur, this.arrayDeSphere[0]);
        for (let i: number = 1; i < this.arrayDeSphere.length; i++) {
            this.miseAjourP(voituresAi[i - 1], this.arrayDeSphere[i]);
        }
    }

    private miseAjourP(voiture: Voiture, spheres: Array<Mesh>): void {
        const vecteurPlacement: Vector3[] = [SPHERE_ARRIERE, SPHERE_MILIEU, SPHERE_AVANT];
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            let directionTempo: Vector3 = voiture.getDirection().clone();
            let positionTempo: Vector3 = voiture.position.clone();
            directionTempo = directionTempo.multiply(vecteurPlacement[i]);
            positionTempo.add(directionTempo);
            spheres[i].position.set(positionTempo.x, positionTempo.y, positionTempo.z);
        }
    }

    public genererSphere(scene: Scene): Array<Mesh> {
        let tabTempo: Array<Mesh> = new Array<Mesh>;
        for (let i: number = 0; i < NOMBRE_SPHERE; i++) {
            let tempo: Mesh = this.creationShpere();
            tabTempo.push(tempo);
            scene.add(tempo);
        }

        return tabTempo;
    }

    private insererSphereDansVoitureAI(voitures: Voiture[], scene: Scene): void {
        for (const voiture of voitures) {
            this.arrayDeSphere.push(this.genererSphere(scene));
        }
    }

    private insererSphereDansVoitureJoueur(voiture: Voiture, scene: Scene): void {
        this.arrayDeSphere.push(this.genererSphere(scene));
    }

    public insererSphereDansAutos(voitureJoueur: Voiture, voitureAi: Voiture[], scene: Scene): void {
        this.insererSphereDansVoitureJoueur(voitureJoueur, scene);
        this.insererSphereDansVoitureAI(voitureAi, scene);
    }
}
