import { CameraJeu } from "./CameraJeu";
import { Vector3 } from "three";

// Attributs camera
const CHAMP_DE_VISION: number = 70;
const PLAN_RAPPROCHE: number = 1;
const PLAN_ELOIGNE: number = 1000;

const RAYON_MINIMUM_2D: number = 10;
const RAYON_2D_DEFAUT: number = 15;
const RAYON_MAXIMUM_2D: number = 25;

export class CameraJeu2D extends CameraJeu {

    public constructor() {
        super(CHAMP_DE_VISION, PLAN_RAPPROCHE, PLAN_ELOIGNE);
        this.rayon = RAYON_2D_DEFAUT;
    }

    protected obtenirPositionRelative(): Vector3 {
        return new Vector3(0, this.rayon, 0);
    }

    protected reglerPositionnement(POSITION_ABSOLUE: Vector3): void {
        this.position.set(POSITION_ABSOLUE.x, POSITION_ABSOLUE.y, POSITION_ABSOLUE.z);
        this.lookAt(this.voitureSuivie.getPosition());
    }

    public zoomer(): void {
        if (this.rayon < RAYON_MAXIMUM_2D) {
            this.rayon++;
        }
    }

    public dezoomer(): void {
        if (this.rayon > RAYON_MINIMUM_2D) {
            this.rayon--;
        }
    }

}
