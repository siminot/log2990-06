import { Injectable } from "@angular/core";
import { Scene, AxisHelper,
    /*,GridHelper, DoubleSide, AmbientLight, SpotLight, Vector3, MeshBasicMaterial, PlaneGeometry, Mesh*/ } from "three";
import { Voiture } from "../voiture/voiture";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

/*
// Grille
const TAILLE_GRILLE: number = 1000;
const DIVISION_GRILLE: number = 100;
const COULEUR_GRAND_CARRE: number = 0x000000;
const COULEUR_PETIT_CARRE: number = 0x00BFFF;
*/

// Axes
const TAILLE_AXE: number = 1000;

@Injectable()
export class GestionnaireScene {

    private _scene: Scene;
    private estModeNuit: boolean;

    public get voitureJoueur(): Voiture {
        return this.gestionnaireVoiture.voitureJoueur;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
                       private gestionnaireVoiture: GestionnaireVoitures) {
        this._scene = new Scene;
        this.estModeNuit = true;
    }

    // Creation de la scene

    public creerScene(): void {
        this.initialiserEnvironnement();
        this.ajouterPiste();
        this.ajouterVoitureJoueur();
        this.ajouterVoituresAI();
    }

    private initialiserEnvironnement(): void {
        // this._scene.add(new GridHelper(TAILLE_GRILLE, DIVISION_GRILLE, COULEUR_GRAND_CARRE, COULEUR_PETIT_CARRE));
        this._scene.add(new AxisHelper(TAILLE_AXE));
        this._scene.add(this.gestionnaireSkybox.skybox);
    }

    private ajouterPiste(): void {
        return;
    }

    private ajouterVoitureJoueur(): void {
        this._scene.add(this.gestionnaireVoiture.voitureJoueur);
    }

    private ajouterVoituresAI(): void {
        const VOITURES_AI: Voiture[] = this.gestionnaireVoiture.voituresAI;

        for (const VOITURE of VOITURES_AI) {
            this._scene.add(VOITURE);
        }
    }

    // Changement dans la scene

    public miseAJour(tempsDepuisDerniereTrame: number): void {
            this.gestionnaireVoiture.miseAJourVoitures(tempsDepuisDerniereTrame);
    }

    public changerTempsJournee(): void {
        this.estModeNuit = !this.estModeNuit;
        this._scene.remove(this.gestionnaireSkybox.skybox);
        this.gestionnaireSkybox.changerTempsJournee();
        this.gestionnaireVoiture.changerTempsJournee();
        this._scene.add(this.gestionnaireSkybox.skybox);
    }

    public changerDecor(): void {
        this._scene.remove(this.gestionnaireSkybox.skybox);
        this.gestionnaireSkybox.changerDecor();
        this._scene.add(this.gestionnaireSkybox.skybox);
    }
}
