import { Injectable } from "@angular/core";
import { Scene, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh } from "three";
import { IScene } from "../scene/IScene";
import { PI_OVER_2 } from "../constants";
import { GestionnairePiste } from "./GestionnairePiste";

export const PROFONDEUR_SCENE: number = 50;
const COULEUR_FOND: number = 0xB3ECFF;

@Injectable()
export class GestionnaireScenePiste implements IScene {

    private _scene: Scene;

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(private gestionnairePiste: GestionnairePiste) {
        this._scene = new Scene();
        this.creerScene();
    }

    // Creation de la scene

    public creerScene(): void {
        this.ajouterCouleurDeFond();
        this.ajouterPiste();
    }

    private ajouterCouleurDeFond(): void {
        const DIMENSIONS: number = 50000;
        const MATERIEL: MeshBasicMaterial = new MeshBasicMaterial({ color: COULEUR_FOND, side: DoubleSide });
        const geometrie: PlaneGeometry = new PlaneGeometry(DIMENSIONS, DIMENSIONS);
        geometrie.rotateX(PI_OVER_2);
        geometrie.translate(0, PROFONDEUR_SCENE, 0);
        this._scene.add(new Mesh(geometrie, MATERIEL));
    }

    private ajouterPiste(): void {
        this._scene.add(this.gestionnairePiste.piste);
    }
}
