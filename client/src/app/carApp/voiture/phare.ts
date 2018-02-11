import { SpotLight, Vector3 } from "three";
import { PI_OVER_2 } from "../constants";

const COULEUR: number = 0xFFFFFF;
const INTENSITE_DEFAUT: number = 1;
const DISTANCE: number = 15;
const PENOMBRE: number = 0.5;
const RATIO_ANGLE: number = 5;
const ANGLE: number = PI_OVER_2 / RATIO_ANGLE;

export class Phare extends SpotLight {

    private positionRelative: Vector3;
    private angleCentre: number;

    public constructor(positionRelative: Vector3, angle: number) {
        super(COULEUR, INTENSITE_DEFAUT, -DISTANCE, ANGLE, PENOMBRE);
        this.positionRelative = positionRelative;
        this.angleCentre = angle;
    }

    public miseAJourPosition(positionVoiture: Vector3): void {
        const PHARE_POSITION_ABSOLU: Vector3 = this.positionRelative.add(positionVoiture);
        this.position.set(PHARE_POSITION_ABSOLU.x, PHARE_POSITION_ABSOLU.y, PHARE_POSITION_ABSOLU.z);
        this.rotateY(this.angleCentre);
        this.rotateX(-ANGLE);
    }

    public allumer(): void {
        this.intensity = 0;
    }

    public eteindre(): void {
        this.intensity = 0;
    }
}
