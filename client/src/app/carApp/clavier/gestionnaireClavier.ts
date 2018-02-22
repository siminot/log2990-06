import { Injectable } from "@angular/core";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

export const ACCELERATEUR: number = 87;            // w
export const DIRECTION_GAUCHE: number = 65;        // a
export const FREIN: number = 83;                   // s
export const DIRECTION_DROITE: number = 68;        // d
export const CHANGER_VUE: number = 86;             // v
export const ZOOM_IN: number = 61;                 // =
export const ZOOM_OUT: number = 173;               // -
export const CHANGER_DECOR: number = 84;           // t
export const CHANGER_HEURE_JOURNEE: number = 89;   // y

@Injectable()
export class GestionnaireClavier {

    public constructor(private gestionnaireCamera: GestionnaireCamera,
                       private gestionnaireVoitures: GestionnaireVoitures,
                       private gestionnaireScene: GestionnaireScene) { }

    public toucheAppuyee(evenement: KeyboardEvent): void {
        switch (evenement.keyCode) {
            case ACCELERATEUR:
                this.gestionnaireVoitures.voitureJoueur.accelerer();
                break;
            case DIRECTION_GAUCHE:
                this.gestionnaireVoitures.voitureJoueur.virerGauche();
                break;
            case DIRECTION_DROITE:
                this.gestionnaireVoitures.voitureJoueur.virerDroite();
                break;
            case FREIN:
                this.gestionnaireVoitures.voitureJoueur.freiner();
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
                this.gestionnaireVoitures.voitureJoueur.relacherAccelerateur();
                break;
            case DIRECTION_GAUCHE:
            case DIRECTION_DROITE:
                this.gestionnaireVoitures.voitureJoueur.relacherVolant();
                break;
            case FREIN:
                this.gestionnaireVoitures.voitureJoueur.relacherFreins();
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
