import { Injectable, Inject } from "@angular/core";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";

@Injectable()
export class ServiceDeRenduJeu extends ServiceDeRenduAbstrait {

    public constructor(protected gestionnaireScene: GestionnaireScene,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireCamera) gestionnaireCamera: GestionnaireCamera) {
        super(gestionnaireEcran, gestionnaireCamera, gestionnaireScene);
    }

    // Rendu

    protected miseAJour(): void {
        this.gestionnaireScene.miseAJour(Date.now() - this.tempsDerniereMiseAJour);
        this.tempsDerniereMiseAJour = Date.now();
    }
}
