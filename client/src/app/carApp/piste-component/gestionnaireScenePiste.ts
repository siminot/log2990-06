import { Injectable } from "@angular/core";
import { Scene, GridHelper } from "three";
import { IScene } from "../scene/IScene";

@Injectable()
export class GestionnaireScenePiste implements IScene {

    private _scene: Scene;

    public get scene(): Scene {
        return this._scene;
    }

    public constructor() {
        this._scene = new Scene;
    }

    // Creation de la scene

    public creerScene(): void {
        this.ajouterGrille();
    }

    private ajouterGrille(): void {
        const GRANDEUR: number = 10;
        const DIVISIONS: number = 5;
        this._scene.add(new GridHelper(GRANDEUR, DIVISIONS));
    }
}
