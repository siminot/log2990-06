import { Injectable, Inject } from "@angular/core";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";


@Injectable()
export class ServiceDeRenduJeu extends ServiceDeRenduAbstrait {

    public courseEstCommencee: boolean;

    public constructor(protected gestionnaireScene: GestionnaireScene,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireCamera) gestionnaireCamera: GestionnaireCamera) {
        super(gestionnaireEcran, gestionnaireCamera, gestionnaireScene);
        this.courseEstCommencee = false;
    }

    // Rendu

    protected miseAJour(): void {
        /* if (this.courseEstCommencee === false) {
            // let timer: NodeJS.Timer;
            setTimeout(() => this.courseEstCommencee = true, TEMPS_ATTENTE);
        } */
        if (this.courseEstCommencee) {
        this.gestionnaireScene.miseAJour(Date.now() - this.tempsDerniereMiseAJour);
        }
        this.tempsDerniereMiseAJour = Date.now();
    }
}
