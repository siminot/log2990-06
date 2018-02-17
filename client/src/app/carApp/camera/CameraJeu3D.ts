import { CameraJeu } from "./CameraJeu";
import { Vector3, PerspectiveCamera } from "three";

// Attributs camera
const CHAMP_DE_VISION: number = 70;
const PLAN_RAPPROCHE: number = 0.1;
const PLAN_ELOIGNE: number = 10000;

const DISTANCE_MINIMUM: number = 3;
const DISTANCE_DEFAUT: number = 10;
const DISTANCE_MAXIMUM: number = 25;
const PAS_DISTANCE: number = 1;

const POSITION_Y: number = 0.3;

export class CameraJeu3D extends CameraJeu {

    public camera: PerspectiveCamera;
    private distance: number;

    public constructor() {
        super();
        this.camera = new PerspectiveCamera(CHAMP_DE_VISION, null, PLAN_RAPPROCHE, PLAN_ELOIGNE);
        this.distance = DISTANCE_DEFAUT;
    }

    protected obtenirPositionRelative(): Vector3 {
        const POSITION_PLAN_XZ: Vector3 = this.voitureSuivie.direction.negate();

        return new Vector3(POSITION_PLAN_XZ.x, POSITION_Y, POSITION_PLAN_XZ.z);
    }

    protected reglerPositionnement(POSITION_ABSOLUE: Vector3): void {
        this.camera.position.set(POSITION_ABSOLUE.x, POSITION_ABSOLUE.y, POSITION_ABSOLUE.z);
        this.camera.rotateY(this.voitureSuivie.angle);
        this.camera.lookAt(this.voitureSuivie.position);
    }

    public redimensionnement(largeur: number, hauteur: number): void {
        this.camera.aspect = largeur / hauteur;
        this.camera.updateProjectionMatrix();
    }

    public calculerNouvellePositionAbsolue(position: Vector3): Vector3 {
        return position.normalize()
            .multiplyScalar(this.distance)
            .add(this.voitureSuivie.position);
    }

    public zoomer(): void {
        if (this.distance > DISTANCE_MINIMUM) {
            this.distance -= PAS_DISTANCE;
        }
    }

    public dezoomer(): void {
        if (this.distance < DISTANCE_MAXIMUM) {
            this.distance += PAS_DISTANCE;
        }
    }

}
