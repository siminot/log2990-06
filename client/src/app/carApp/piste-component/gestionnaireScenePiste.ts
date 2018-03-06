import { Injectable } from "@angular/core";
import { Scene, GridHelper, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, AxisHelper } from "three";
import { IScene } from "../scene/IScene";
import { PI_OVER_2 } from "../constants";
import { GestionnairePiste } from "./GestionnairePiste";

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
        this.ajouterGrille();
        this.ajouterCouleurDeFond();
        this.ajouterAxes();
        this.ajouterPiste();
    }

    private ajouterGrille(): void {
        const GRANDEUR: number = 100;
        const DIVISIONS: number = 4;
        this._scene.add(new GridHelper(GRANDEUR, GRANDEUR / DIVISIONS));
    }

    private ajouterCouleurDeFond(): void {
        const COULEUR: number = 0x66CCFF;
        const DIMENSIONS: number = 50000;
        const MATERIEL: MeshBasicMaterial = new MeshBasicMaterial({ color: COULEUR, side: DoubleSide });
        const geometrie: PlaneGeometry = new PlaneGeometry(DIMENSIONS, DIMENSIONS);
        geometrie.rotateX(PI_OVER_2);
        geometrie.translate(0, 1, 0);
        this._scene.add(new Mesh(geometrie, MATERIEL));
    }

    private ajouterAxes(): void {
        const TAILLE: number = 5000;
        this._scene.add(new AxisHelper(TAILLE));
    }

    private ajouterPiste(): void {
        this._scene.add(this.gestionnairePiste.piste);
    }
}
