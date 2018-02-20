import { Injectable } from "@angular/core";
import { ObjectLoader, Object3D } from "three";
import { Voiture } from "../voiture/voiture";

// AI
const NOMBRE_AI: number = 1;

// Textures
const CHEMIN_TEXTURE: string = "../../../assets/voitures/";
const NOMS_TEXTURES: string[] = ["camero-2010-low-poly.json", "voiture-2010-low-poly.json"];
const TEXTURE_DEFAUT_JOUEUR: number = 1;

@Injectable()
export class GestionnaireVoitures {

    private _voitureJoueur: Voiture;
    private _voituresAI: Voiture[];
    private _estModeNuit: boolean;

    public get voitureJoueur(): Voiture {
        return this._voitureJoueur;
    }

    public get voituresAI(): Voiture[] {
        return this._voituresAI;
    }

    public get estModeNuit(): boolean {
        return this._estModeNuit;
    }

    public constructor() {
        this._voituresAI = [];
        this._estModeNuit = false;
        this.initialiser().catch(() => new Error("Erreur construction des voitures"));
    }

    // Creation des voitures

    private async initialiser(): Promise<void> {
        this.creerVoitureJoueur();
        this.creerVoituresAI();
        this.miseAJourPhares();
    }

    private async creerVoitureJoueur(): Promise<void> {
        this._voitureJoueur = new Voiture();
        this._voitureJoueur.init(await this.chargerTexture(NOMS_TEXTURES[TEXTURE_DEFAUT_JOUEUR]));
    }

    private async creerVoituresAI(): Promise<void> {
        for (let i: number = 0; i < NOMBRE_AI; i++) {
            this._voituresAI.push(new Voiture());
            this._voituresAI[i].init(await this.chargerTexture(NOMS_TEXTURES[i % NOMS_TEXTURES.length]));
        }
    }

    private async chargerTexture(URL_TEXTURE: string): Promise<Object3D> {
        return new Promise<Object3D>((resolve, reject) => {
            const loader: ObjectLoader = new ObjectLoader();
            loader.load(CHEMIN_TEXTURE + URL_TEXTURE, (object) => {
                resolve(object);
            });
        });
    }

    // Changements affectant les voitures

    public miseAJourVoitures(tempsDepuisDerniereTrame: number): void {
            this.voitureJoueur.update(tempsDepuisDerniereTrame);

            for (const voiture of this._voituresAI) {
                voiture.update(tempsDepuisDerniereTrame);
            }
    }

    public changerTempsJournee(): void {
        this._estModeNuit = !this._estModeNuit;
        this.miseAJourPhares();
    }

    private miseAJourPhares(): void {
        if (this._estModeNuit) {
            this._voitureJoueur.eteindrePhares();

            for (const voiture of this._voituresAI) {
                voiture.eteindrePhares();
            }
        } else {
            this._voitureJoueur.allumerPhares();

            for (const voiture of this._voituresAI) {
                voiture.allumerPhares();
            }
        }
    }
}
