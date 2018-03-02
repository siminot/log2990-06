import { Injectable } from "@angular/core";
import { ObjectLoader, Object3D } from "three";
import { Voiture } from "../voiture/voiture";
import { TempsJournee } from "../skybox/skybox";

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

    public get voitureJoueur(): Voiture {
        return this._voitureJoueur;
    }

    public get voituresAI(): Voiture[] {
        return this._voituresAI;
    }

    public constructor() {
        this._voituresAI = [];
        this.initialiser().catch(() => new Error("Erreur lors de l'initialisation"));
    }

    // Creation des voitures

    private async initialiser(): Promise<void> {
        this.creerVoitureJoueur().catch(() => new Error("Erreur construction de la voiture du joueur"));
        this.creerVoituresAI().catch(() => new Error("Erreur construction des voituresAI"));
    }

    private async creerVoitureJoueur(): Promise<void> {
        this._voitureJoueur = new Voiture();
        this._voitureJoueur.initialiser(await this.chargerTexture(NOMS_TEXTURES[TEXTURE_DEFAUT_JOUEUR]));
    }

    private async creerVoituresAI(): Promise<void> {
        for (let i: number = 0; i < NOMBRE_AI; i++) {
            this._voituresAI.push(new Voiture());
            this._voituresAI[i].initialiser(await this.chargerTexture(NOMS_TEXTURES[i % NOMS_TEXTURES.length]));
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

    public changerTempsJournee(temps: TempsJournee): void {
        if (temps === TempsJournee.Jour) {
            for (const voiture of this.voitures) {
                voiture.eteindrePhares();
            }
        } else {
            for (const voiture of this.voitures) {
                voiture.allumerPhares();
            }
        }
    }

    public get voitures(): Voiture[] {
        return this._voituresAI.concat([this._voitureJoueur]);
    }
}
