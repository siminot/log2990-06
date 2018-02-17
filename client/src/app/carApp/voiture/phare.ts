import { SpotLight, Vector3, Mesh, SphereGeometry, MeshBasicMaterial, Object3D, Color} from "three";
import { PI_OVER_2 } from "../constants";

const COULEUR_ALLUMEE: number = 0xFFCC00;
const COULEUR_ETEINTE: number = 0x000000;
const INTENSITE_DEFAUT: number = 3;
const DISTANCE: number = 30;
const PENOMBRE: number = 0.5;
const RATIO_ANGLE: number = 2.5;
const ANGLE: number = PI_OVER_2 / RATIO_ANGLE;
const RAYON_AMPOULE: number = 0.05;
const AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE: number = 0.75;

export class Phare {

    public faisceau: SpotLight;
    public ampoule: Mesh;
    private materielSphere: MeshBasicMaterial;

    public constructor(positionRelative: Vector3) {
        this.faisceau = new SpotLight(COULEUR_ALLUMEE, INTENSITE_DEFAUT, DISTANCE, ANGLE, PENOMBRE);
        this.faisceau.position.set(positionRelative.x, positionRelative.y, positionRelative.z + AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE);

        this.materielSphere = new MeshBasicMaterial( {color: COULEUR_ALLUMEE} );
        this.ampoule = new Mesh(new SphereGeometry(RAYON_AMPOULE), this.materielSphere);
        this.ampoule.position.set(positionRelative.x, positionRelative.y, positionRelative.z);
    }

    public suivre(cible: Object3D): void {
        this.faisceau.target = cible;
    }

    public allumer(): void {
        this.faisceau.intensity = INTENSITE_DEFAUT;
        this.materielSphere.color = new Color(COULEUR_ALLUMEE);
    }

    public eteindre(): void {
        this.faisceau.intensity = 0;
        this.materielSphere.color = new Color(COULEUR_ETEINTE);
    }
}
