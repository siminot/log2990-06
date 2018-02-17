import { Injectable } from "@angular/core";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

const ACCELERATEUR: number = 87;            // w
const DIRECTION_GAUCHE: number = 65;        // a
const FREIN: number = 83;                   // s
const DIRECTION_DROITE: number = 68;        // d
const CHANGER_VUE: number = 86;             // v
const ZOOM_IN: number = 61;                 // =
const ZOOM_OUT: number = 173;               // -
const CHANGER_DECOR: number = 84;           // t
const CHANGER_HEURE_JOURNEE: number = 89;   // y

@Injectable()
export class GestionnaireClavier {

    public constructor(private gestionnaireCamera: GestionnaireCamera,
                       private gestionnaireVoitures: GestionnaireVoitures,
                       private gestionnaireScene: GestionnaireScene) { }

    public toucheAppuyee(evenement: KeyboardEvent): void {
        switch (evenement.keyCode) {
            case ACCELERATEUR:
                this.gestionnaireVoitures.voitureJoueur.isAcceleratorPressed = true;
                break;
            case DIRECTION_GAUCHE:
                this.gestionnaireVoitures.voitureJoueur.steerLeft();
                break;
            case DIRECTION_DROITE:
                this.gestionnaireVoitures.voitureJoueur.steerRight();
                break;
            case FREIN:
                this.gestionnaireVoitures.voitureJoueur.brake();
                break;
            case ZOOM_IN:
                this.gestionnaireCamera.zoomer();
                break;
            case ZOOM_OUT:
                this.gestionnaireCamera.dezoomer();
                break;
            default:
                break;
        }
    }

    public toucheRelevee(evenement: KeyboardEvent): void {
        switch (evenement.keyCode) {
            case ACCELERATEUR:
                this.gestionnaireVoitures.voitureJoueur.isAcceleratorPressed = false;
                break;
            case DIRECTION_GAUCHE:
            case DIRECTION_DROITE:
                this.gestionnaireVoitures.voitureJoueur.releaseSteering();
                break;
            case FREIN:
                this.gestionnaireVoitures.voitureJoueur.releaseBrakes();
                break;
            case CHANGER_VUE:
                this.gestionnaireCamera.changerCamera();
                break;
            case CHANGER_DECOR:
                this.gestionnaireScene.changerDecor();
                break;
            case CHANGER_HEURE_JOURNEE:
                this.gestionnaireScene.changerTempsJournee();
                break;
            default:
                break;
        }
    }
}
