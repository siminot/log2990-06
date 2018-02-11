import { CameraJeu } from "./CameraJeu";
import { Vector3 } from "three";

// Attributs camera
const CHAMP_DE_VISION: number = 70;
const PLAN_RAPPROCHE: number = 0.1;
const PLAN_ELOIGNE: number = 1000;

const RAYON_MINIMUM_3D: number = 3;
const RAYON_3D_DEFAUT: number = 10;
const RAYON_MAXIMUM_3D: number = 25;

const POSITION_Y: number = 0.3;

export class CameraJeu3D extends CameraJeu {

    public constructor() {
        super(CHAMP_DE_VISION, PLAN_RAPPROCHE, PLAN_ELOIGNE);
        this.rayon = RAYON_3D_DEFAUT;
    }

    protected obtenirPositionRelative(): Vector3 {
        const POSITION_PLAN_XZ: Vector3 = this.voitureSuivie.direction.negate();

        return new Vector3(POSITION_PLAN_XZ.x, POSITION_Y, POSITION_PLAN_XZ.z);
    }

    protected reglerPositionnement(POSITION_ABSOLUE: Vector3): void {
        this.position.set(POSITION_ABSOLUE.x, POSITION_ABSOLUE.y, POSITION_ABSOLUE.z);
        this.rotateY(this.voitureSuivie.angle);
        this.lookAt(this.voitureSuivie.getPosition());
    }

    public zoomer(): void {
        if (this.rayon < RAYON_MAXIMUM_3D) {
            this.rayon++;
        }
    }

    public dezoomer(): void {
        if (this.rayon > RAYON_MINIMUM_3D) {
            this.rayon--;
        }
    }

}
