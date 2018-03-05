import { Injectable } from "@angular/core";
import { Scene, Camera } from "three";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";

@Injectable()
export class ServiceDeRenduJeu extends ServiceDeRenduAbstrait {

    public constructor(protected gestionnaireEcran: GestionnaireEcran,
                       private gestionnaireScene: GestionnaireScene,
                       private gestionnaireCamera: GestionnaireCamera) {
        super(gestionnaireEcran);
    }

    // Initialisation

    protected async initialisation(): Promise<void> {
        await  this.gestionnaireScene.creerScene();
    }

    // Rendu

    protected miseAJour(): void {
        this.gestionnaireScene.miseAJour(Date.now() - this.tempsDerniereMiseAJour);
        this.tempsDerniereMiseAJour = Date.now();
    }

    // Mise à jour de la taille de la fenetre

    public redimensionnement(): void {
        this.renderer.setSize(this.gestionnaireEcran.largeur, this.gestionnaireEcran.hauteur);
        this.gestionnaireCamera.redimensionnement(this.gestionnaireEcran.largeur, this.gestionnaireEcran.hauteur);
    }

    // Obtenir la scene et la camera

    protected get scene(): Scene {
        return this.gestionnaireScene.scene;
    }
    protected get camera(): Camera {
        return this.gestionnaireCamera.camera;
    }
}
