import { Injectable } from "@angular/core";
import { Camera, OrthographicCamera, Vector3 } from "three";
import { ICamera } from "../camera/ICamera";

const PLAN_RAPPROCHE: number = 0;
const PLAN_ELOIGNE: number = 10;
const ZOOM_DEFAUT: number = 1;
const ORIGINE: Vector3 = new Vector3(0, 0, 0);
const HAUTEUR: number = 10;
const POSITION: Vector3 = new Vector3(0, HAUTEUR, 0);

@Injectable()
export class GestionnaireCameraPiste implements ICamera {

    private _camera: OrthographicCamera;
    private hauteur: number;
    private largeur: number;

    public get camera(): Camera {
        return this._camera;
    }

    public constructor() {
        this._camera = new OrthographicCamera(null, null, null, null, PLAN_RAPPROCHE, PLAN_ELOIGNE);
        this._camera.zoom = ZOOM_DEFAUT;
        this._camera.lookAt(ORIGINE);
        this.camera.position.set(POSITION.x, POSITION.y, POSITION.z);
    }

    public redimensionnement(largeur: number, hauteur: number): void {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.ajusterVue();
    }

    private ajusterVue(): void {
        const DEUX: number = 2;
        this._camera.left = -(this.largeur / DEUX);
        this._camera.right = (this.largeur / DEUX);
        this._camera.top = (this.hauteur / DEUX);
        this._camera.bottom = -(this.hauteur / DEUX);
        this._camera.updateProjectionMatrix();
    }

}
