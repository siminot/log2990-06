import { CameraJeu } from "./CameraJeu";
import { Vector3, PerspectiveCamera } from "three";

// Attributs camera
export const CHAMP_DE_VISION: number = 70;
export const PLAN_RAPPROCHE: number = 0.1;
export const PLAN_ELOIGNE: number = 10000;

export const DISTANCE_MINIMUM: number = 3;
export const DISTANCE_DEFAUT: number = 10;
export const DISTANCE_MAXIMUM: number = 13;
export const PAS_DISTANCE: number = 1;

const POSITION_Y: number = 0.3;

export class CameraJeu3D extends CameraJeu {

    private _camera: PerspectiveCamera;
    private distance: number;

    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    public constructor() {
        super();
        this._camera = new PerspectiveCamera(CHAMP_DE_VISION, null, PLAN_RAPPROCHE, PLAN_ELOIGNE);
        this.distance = DISTANCE_DEFAUT;
    }

    protected obtenirPositionRelative(): Vector3 {
        return new Vector3(this.positionPlanXZ.x, POSITION_Y, this.positionPlanXZ.z);
    }

    protected reglerPositionnement(POSITION_ABSOLUE: Vector3): void {
        this.camera.position.set(POSITION_ABSOLUE.x, POSITION_ABSOLUE.y, POSITION_ABSOLUE.z);
        this.camera.rotateY(this.voitureSuivie.angle);
        this.camera.lookAt(this.voitureSuivie.position);
    }

    protected calculerNouvellePositionAbsolue(position: Vector3): Vector3 {
        return position.normalize()
                       .multiplyScalar(this.distance)
                       .add(this.voitureSuivie.position);
    }

    public zoomer(): void {
        this.distance = Math.max(DISTANCE_MINIMUM, this.distance -= PAS_DISTANCE);
    }

    public dezoomer(): void {
        this.distance = Math.min(DISTANCE_MAXIMUM, this.distance += PAS_DISTANCE);
    }

    public redimensionnement(largeur: number, hauteur: number): void {
        this.camera.aspect = largeur / hauteur;
        this.camera.updateProjectionMatrix();
    }

    private get positionPlanXZ(): Vector3 {
        return this.voitureSuivie.direction.negate();
    }
}
