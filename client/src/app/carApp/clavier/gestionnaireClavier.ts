import { Injectable } from "@angular/core";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

export const ACCELERATEUR: string = "w";
export const DIRECTION_GAUCHE: string = "a";
export const FREIN: string = "s";
export const DIRECTION_DROITE: string = "d";
export const CHANGER_VUE: string = "v";
export const ZOOM_IN: string = "=";
export const ZOOM_OUT: string = "-";
export const CHANGER_DECOR: string = "t";
export const CHANGER_HEURE_JOURNEE: string = "y";

@Injectable()
export class GestionnaireClavier {

    public constructor(private gestionnaireCamera: GestionnaireCamera,
                       private gestionnaireVoitures: GestionnaireVoitures,
                       private gestionnaireScene: GestionnaireScene) { }

    public toucheAppuyee(evenement: KeyboardEvent): void {
        switch (evenement.key) {
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
        switch (evenement.key) {
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
