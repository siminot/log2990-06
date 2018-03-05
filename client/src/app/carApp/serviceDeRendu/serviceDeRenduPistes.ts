import { Injectable } from "@angular/core";
import { Scene, Camera, OrthographicCamera } from "three";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";

@Injectable()
export class ServiceDeRenduPistes extends ServiceDeRenduAbstrait {

    private _scene: Scene;
    private _camera: OrthographicCamera;

    public constructor(protected gestionnaireEcran: GestionnaireEcran) {
        super(gestionnaireEcran);
    }

    // Initialisation

    protected async initialisation(): Promise<void> { }

    // Rendu

    protected miseAJour(): void { }

    // Obtenir la scene et la camera

    protected get scene(): Scene {
        return this._scene;
    }
    protected get camera(): Camera {
        return this._camera;
    }
}
