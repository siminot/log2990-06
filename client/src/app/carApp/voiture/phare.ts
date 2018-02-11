import { SpotLight, Vector3 } from "three";
import { PI_OVER_2 } from "../constants";

const COULEUR: number = 0xFFFFFF;
const INTENSITE: number = 50;
const DISTANCE: number = 20;
const RATIO_ANGLE: number = 5;
const ANGLE: number = PI_OVER_2 / RATIO_ANGLE;

export class Phare extends SpotLight {

    private positionRelative: Vector3;
    private _angle: number;

    public constructor(positionRelative: Vector3, angle: number) {
        super(COULEUR, INTENSITE, -DISTANCE, ANGLE);
        this.positionRelative = positionRelative;
        this._angle = angle;
    }

    public miseAJourPosition(positionVoiture: Vector3): void {
        const PHARE_POSITION_ABSOLU: Vector3 = this.positionRelative.add(positionVoiture);
        this.position.set(PHARE_POSITION_ABSOLU.x, PHARE_POSITION_ABSOLU.y, PHARE_POSITION_ABSOLU.z);
        this.rotateY(this._angle);
    }

    public allumer(): void {
        this.intensity = INTENSITE;
    }

    public eteindre(): void {
        this.intensity = INTENSITE;
    }
}
