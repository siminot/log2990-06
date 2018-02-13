import { SpotLight, Vector3, Object3D, SpotLightHelper, Mesh, SphereGeometry, Sphere, MeshBasicMaterial, Color } from "three";
import { PI_OVER_2 } from "../constants";

const COULEUR_ALLUMEE: number = 0xFFCC00;
const COULEUR_ETEINTE: number = 0x000000;
const INTENSITE_DEFAUT: number = 1;
const DISTANCE: number = 15;
const PENOMBRE: number = 0.5;
const RATIO_ANGLE: number = 5;
const ANGLE: number = PI_OVER_2 / RATIO_ANGLE;
const RAYON_AMPOULE: number = 0.05;

export class Phare {

    private _faisceau: SpotLight;
    private helper: SpotLightHelper;
    private _ampoule: Mesh;
    private positionRelative: Vector3;
    private angleCentre: number;
    private materielSphere: MeshBasicMaterial;

    public get faisceau(): SpotLight {
        return this._faisceau;
    }

    public get ampoule(): Mesh {
        return this._ampoule;
    }

    public constructor(positionRelative: Vector3, angle: number) {
        this._faisceau = new SpotLight(COULEUR_ALLUMEE, INTENSITE_DEFAUT, -DISTANCE, ANGLE, PENOMBRE);
        this.positionRelative = positionRelative;
        this.angleCentre = angle;

        this.materielSphere = new MeshBasicMaterial( {color: COULEUR_ALLUMEE} );
        this._ampoule = new Mesh(new SphereGeometry(RAYON_AMPOULE), this.materielSphere);
        this._ampoule.position.set(positionRelative.x, positionRelative.y, positionRelative.z);
    }

    public miseAJourPosition(positionVoiture: Vector3): void {
        const PHARE_POSITION_ABSOLU: Vector3 = this.positionRelative.add(positionVoiture);
        this._faisceau.position.set(PHARE_POSITION_ABSOLU.x, PHARE_POSITION_ABSOLU.y, PHARE_POSITION_ABSOLU.z);
        this._faisceau.rotateY(this.angleCentre);
        this._faisceau.rotateX(-ANGLE);
    }

    public allumer(): void {
        this._faisceau.intensity = INTENSITE_DEFAUT;
    }

    public eteindre(): void {
        this._faisceau.intensity = 0;
    }
}
