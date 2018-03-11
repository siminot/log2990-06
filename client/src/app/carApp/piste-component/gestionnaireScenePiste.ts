import { Injectable } from "@angular/core";
import { Scene, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, /* AxisHelper, GridHelper */ } from "three";
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
        // this.ajouterGrille();
        this.ajouterCouleurDeFond();
        // this.ajouterAxes();
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
/*
    private ajouterGrille(): void {
        const GRANDEUR: number = 100;
        const DIVISIONS: number = 4;
        this._scene.add(new GridHelper(GRANDEUR, GRANDEUR / DIVISIONS));
    }

    private ajouterAxes(): void {
        const TAILLE: number = 5000;
        this._scene.add(new AxisHelper(TAILLE));
    }
*/
    private ajouterPiste(): void {
        this._scene.add(this.gestionnairePiste.piste);
    }
}
