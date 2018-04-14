import { Object3D, Raycaster, Vector3, Intersection } from "three";
import { NOM_PISTE_JEU } from "../constants";

const BAS: Vector3 = new Vector3(0, -1, 0);
const LARGEUR: number = 0.5;
const PROFONDEUR: number = -1.55;
const HAUTEUR: number = 0.5;
const PLAN_RAPPROCHE: number = 5;
const PLAN_ELOIGNE: number = -5;

const POSITIONS_RAYONS: Vector3[] = [
    new Vector3( LARGEUR, HAUTEUR,  PROFONDEUR),
    new Vector3( LARGEUR, HAUTEUR, -PROFONDEUR),
    new Vector3(-LARGEUR, HAUTEUR,  PROFONDEUR),
    new Vector3(-LARGEUR, HAUTEUR, -PROFONDEUR),
];

export class VerificateurSortiePiste extends Object3D {

    public constructor() {
        super();
    }

    public estSurPiste(): boolean {
        for (const rayon of this.rayons) {
            if (!this.contientLaPiste(rayon.intersectObject(this.scene, true))) {
                return false;
            }
        }

        return true;
    }

    private get rayons(): Raycaster[] {
        const rayons: Raycaster[] = [];
        const positionVoiture: Vector3 = new Vector3(this.voiture.position.x, 0, this.voiture.position.z);

        for (const position of POSITIONS_RAYONS) {
            rayons.push(new Raycaster(positionVoiture.clone().add(position), BAS, PLAN_ELOIGNE, PLAN_RAPPROCHE));
        }

        return rayons;
    }

    private contientLaPiste(elements: Intersection[]): boolean {
        for (const element of elements) {
            if (element.object.name === NOM_PISTE_JEU) {
                return true;
            }
        }

        return false;
    }

    private get scene(): Object3D {
        return this.parent.parent;
    }

    private get voiture(): Object3D {
        return this.parent;
    }
}
