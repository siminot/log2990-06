import { Object3D, Mesh, SphereGeometry, MeshBasicMaterial, Raycaster, Vector3, Intersection } from "three";
import { NOM_PISTE_JEU } from "../constants";

const BAS: Vector3 = new Vector3(0, -1, 0);
const LARGEUR: number = 0.5;
const PROFONDEUR: number = -1.65;
const HAUTEUR: number = 0.5;
const PLAN_RAPPROCHE: number = 5;
const PLAN_ELOIGNE: number = -5;

export class VerificateurSortiePiste extends Object3D {

    public constructor() {
        super();

        const mesh1: Mesh = new Mesh(new SphereGeometry(1), new MeshBasicMaterial( {color: 0xFFFFFF}));
        // mesh1.setPosition = position = BAS;
        this.add(mesh1);
    }

    public estSurPiste(): boolean {
        for (const rayon of this.rayons) {
            if (this.contientLaPiste(rayon.intersectObject(this.scene, true))) {
                return true;
            }
        }

        return false;
    }

    private get rayons(): Raycaster[] {
        const position: Vector3 = new Vector3(this.voiture.position.x, HAUTEUR, this.voiture.position.z);

        return [new Raycaster(position, BAS, PLAN_ELOIGNE, PLAN_RAPPROCHE)];
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
