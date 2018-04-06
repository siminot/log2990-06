import { Injectable, Inject } from "@angular/core";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";

const TEMPS_ATTENTE: number = 10000;

@Injectable()
export class ServiceDeRenduJeu extends ServiceDeRenduAbstrait {

    private courseEstCommencee: boolean;

    public constructor(protected gestionnaireScene: GestionnaireScene,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireCamera) gestionnaireCamera: GestionnaireCamera) {
        super(gestionnaireEcran, gestionnaireCamera, gestionnaireScene);
        this.courseEstCommencee = false;
    }

    // Rendu

    protected miseAJour(): void {
        if (this.courseEstCommencee === false) {
            // let timer: NodeJS.Timer;
            global.setTimeout(() => this.courseEstCommencee = true, TEMPS_ATTENTE);
        }
        if (this.courseEstCommencee === true) {
        this.gestionnaireScene.miseAJour(Date.now() - this.tempsDerniereMiseAJour);
        }
        this.tempsDerniereMiseAJour = Date.now();
    }
}
