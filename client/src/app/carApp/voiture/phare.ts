import { SpotLight, Vector3, Mesh, SphereGeometry, MeshBasicMaterial, Color} from "three";
import { PI_OVER_2 } from "../constants";

export const COULEUR_ALLUMEE: number = 0xFFCC00;
export const COULEUR_ETEINTE: number = 0x000000;
export const INTENSITE_ALLUME: number = 3;
export const INTENSITE_ETEINT: number = 0;
export const DISTANCE: number = 30;
export const PENOMBRE: number = 0.5;
const RATIO_ANGLE: number = 2.5;
const ANGLE: number = PI_OVER_2 / RATIO_ANGLE;
const RAYON_AMPOULE: number = 0.05;
const AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE: number = 0.75;

export class Phare extends SpotLight {

    private materielAmpoule: MeshBasicMaterial;

    public constructor(positionRelative: Vector3) {
        super(COULEUR_ALLUMEE, INTENSITE_ALLUME, DISTANCE, ANGLE, PENOMBRE);
        this.position.set(positionRelative.x, positionRelative.y, positionRelative.z + AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE);
        this.materielAmpoule = new MeshBasicMaterial( {color: COULEUR_ALLUMEE} );
        this.add(this.ampoule);
    }

    public allumer(): void {
        this.intensity = INTENSITE_ALLUME;
        this.materielAmpoule.color = new Color(COULEUR_ALLUMEE);
    }

    public eteindre(): void {
        this.intensity = INTENSITE_ETEINT;
        this.materielAmpoule.color = new Color(COULEUR_ETEINTE);
    }

    private get ampoule(): Mesh {
        const ampoule: Mesh = new Mesh(new SphereGeometry(RAYON_AMPOULE), this.materielAmpoule);
        ampoule.position.set(0, 0, -AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE);

        return ampoule;
    }
}
