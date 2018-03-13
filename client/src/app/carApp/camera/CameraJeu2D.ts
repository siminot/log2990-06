import { CameraJeu } from "./CameraJeu";
import { Vector3, OrthographicCamera } from "three";

export const PLAN_RAPPROCHE: number = 0;
export const PLAN_ELOIGNE: number = 10;

export const ZOOM_MINIMUM: number = 16;
export const ZOOM_DEFAUT: number = 30;
export const ZOOM_MAXIMUM: number = 50;
export const PAS_ZOOM: number = 2;

export class CameraJeu2D extends CameraJeu {

    private _camera: OrthographicCamera;
    private zoom: number;
    private largeur: number;
    private hauteur: number;

    public get camera(): OrthographicCamera {
        return this._camera;
    }

    public constructor() {
        super();
        this._camera = new OrthographicCamera(null, null, null, null, PLAN_RAPPROCHE, PLAN_ELOIGNE);
        this.zoom = ZOOM_DEFAUT;
        this.largeur = null;
        this.hauteur = null;
    }

    protected obtenirPositionRelative(): Vector3 {
        return new Vector3(0, 1, 0);
    }

    protected reglerPositionnement(POSITION_ABSOLUE: Vector3): void {
        this.camera.position.set(POSITION_ABSOLUE.x, POSITION_ABSOLUE.y, POSITION_ABSOLUE.z);
        this.camera.lookAt(this.voitureSuivie.position);
        this.ajusterVue();
    }

    protected calculerNouvellePositionAbsolue(position: Vector3): Vector3 {
        return position.normalize()
            .add(this.voitureSuivie.position);
    }

    private ajusterVue(): void {
        const DEUX: number = 2;
        this.camera.left = -(this.largeur / DEUX);
        this.camera.right = (this.largeur / DEUX);
        this.camera.top = (this.hauteur / DEUX);
        this.camera.bottom = -(this.hauteur / DEUX);
        this.camera.zoom = this.zoom;
        this.camera.updateProjectionMatrix();
    }

    public zoomer(): void {
        this.zoom = Math.min(ZOOM_MAXIMUM, this.zoom += PAS_ZOOM);
    }

    public dezoomer(): void {
        this.zoom = Math.max(ZOOM_MINIMUM, this.zoom -= PAS_ZOOM);

    }

    public redimensionnement(largeur: number, hauteur: number): void {
        this.largeur = largeur;
        this.hauteur = hauteur;
    }
}
