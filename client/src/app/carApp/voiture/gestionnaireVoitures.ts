import { Injectable } from "@angular/core";
import { ObjectLoader, SpotLight, Object3D } from "three";
import { Voiture } from "../voiture/voiture";

// AI
const NOMBRE_AI: number = 0;

// Textures
const CHEMIN_TEXTURE: string = "../../../assets/voitures/";
const NOMS_TEXTURES: string[] = ["camero-2010-low-poly.json", "voiture-2010-low-poly.json"];

@Injectable()
export class GestionnaireVoitures {

    private _voitureJoueur: Voiture;
    private _voituresAI: Voiture[];
    private estModeNuit: boolean;

    public get voitureJoueur(): Voiture {
        return this._voitureJoueur;
    }

    public get voituresAI(): Voiture[] {
        return this._voituresAI;
    }

    public constructor() {
        this._voituresAI = [];
        this.estModeNuit = false;
        this.initialiser();
    }

    private initialiser(): void {
        this.creerVoitureJoueur();
        this.creerVoituresAI();
    }

    private initialiserLumieres(): void {
        // Lumiere voiture
        const COULEUR_PHARE: number = 0xFFFFFF;
        const INTENSITE: number = 1;
        const DISTANCE: number = 25;
        const ANGLE: number = 50;
        const phare1: SpotLight = new SpotLight(COULEUR_PHARE, INTENSITE, DISTANCE, ANGLE);
        phare1.castShadow = true;
        phare1.position.set(this.voitureJoueur.getPosition().x, this.voitureJoueur.getPosition().y, this.voitureJoueur.getPosition().z);
    }

    private async creerVoitureJoueur(): Promise<void> {
        this._voitureJoueur = new Voiture();
        this._voitureJoueur.init(await this.chargerTexture(NOMS_TEXTURES[1]));

        this.initialiserLumieres();
    }

    private async creerVoituresAI(): Promise<void> {
        for (let i: number = 0; i < NOMBRE_AI; i++) {
            this._voituresAI.push(new Voiture());
            this._voituresAI[i].init(await this.chargerTexture(NOMS_TEXTURES[i % NOMS_TEXTURES.length]));
        }
    }

    public miseAJourVoitures(tempsDepuisDerniereTrame: number): void {
            this.voitureJoueur.update(tempsDepuisDerniereTrame);
            /*
            for (const voiture of this._voituresAI) {
                voiture.update(tempsDepuisDerniereTrame);
            } */
    }

    public changerTempsJournee(): void {
        this.estModeNuit = !this.estModeNuit;
    }

    private async chargerTexture(URL_TEXTURE: string): Promise<Object3D> {
        return new Promise<Object3D>((resolve, reject) => {
            const loader: ObjectLoader = new ObjectLoader();
            loader.load(CHEMIN_TEXTURE + URL_TEXTURE, (object) => {
                resolve(object);
            });
        });
    }

}