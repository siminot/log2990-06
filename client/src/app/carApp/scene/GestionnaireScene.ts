import { Injectable } from "@angular/core";
import { Scene, GridHelper, AxisHelper, AmbientLight } from "three";
import { Voiture } from "../voiture/voiture";

// Grille
const TAILLE_GRILLE: number = 1000;
const DIVISION_GRILLE: number = 100;
const COULEUR_GRAND_CARRE: number = 0x000000;
const COULEUR_PETIT_CARRE: number = 0x00BFFF;

// Axes
const TAILLE_AXE: number = 1000;

// Lumière ambiante
const BLANC: number = 0xFFFFFF;
const OPACITE_LUMIERE: number = 1;

// AI
const NOMBRE_AI: number = 0;

@Injectable()
export class GestionnaireScene {

    private _scene: Scene;
    private _voitureJoueur: Voiture;
    private _voituresAI: Voiture[];

    public get voitureJoueur(): Voiture {
        return this._voitureJoueur;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public constructor() {
        this._scene = new Scene;
        this._voituresAI = [];
    }

    private initialiserEnvironnement(): void {
        this._scene.add(new GridHelper(TAILLE_GRILLE, DIVISION_GRILLE, COULEUR_GRAND_CARRE, COULEUR_PETIT_CARRE));
        this._scene.add(new AxisHelper(TAILLE_AXE));
        this._scene.add(new AmbientLight(BLANC, OPACITE_LUMIERE));
    }

    private ajouterPiste(): void {
        return;
    }

    private async ajouterVoitureJoueur(): Promise<void> {
        this._scene.add(this._voitureJoueur = new Voiture());
        await this._voitureJoueur.init();
    }

    private async ajouterVoituresAI(): Promise<void> {
        for (let i: number = 0; i < NOMBRE_AI; i++) {
            this._voituresAI[i] = new Voiture();
            await this._voituresAI[i].init();
            this.scene.add(this._voituresAI[i]);
        }
    }

    public miseAJourVoitures(tempsDepuisDerniereTrame: number): void {
            this.voitureJoueur.update(tempsDepuisDerniereTrame);

            for (const voiture of this._voituresAI) {
                voiture.update(tempsDepuisDerniereTrame);
            }
    }

    public async creerScene(): Promise<void> {
        this.initialiserEnvironnement();
        this.ajouterPiste();
        await this.ajouterVoitureJoueur();
        await this.ajouterVoituresAI();
    }
}
