import { Injectable } from "@angular/core";
import { Camera, OrthographicCamera } from "three";
import { ICamera } from "../camera/ICamera";
import { PI_OVER_2 } from "../constants";

const PLAN_RAPPROCHE: number = 0;
const PLAN_ELOIGNE: number = 10;
const ZOOM_DEFAUT: number = 30;

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
        this._camera.rotateX(PI_OVER_2);
        this._camera.updateProjectionMatrix();
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
