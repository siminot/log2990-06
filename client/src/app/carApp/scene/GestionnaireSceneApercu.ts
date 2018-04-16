import { Injectable, Input } from "@angular/core";
import { Scene, Vector3 } from "three";
import { IScene } from "./IScene";
import { PisteJeu } from "../piste/pisteJeu";
import { PISTE_TEST } from "../piste/pisteTest";
import { Point } from "../elementsGeometrie/point";

@Injectable()
export class GestionnaireSceneApercu implements IScene {

    private _scene: Scene;
    private piste: PisteJeu;
    @Input() public points: Point[];

    public get scene(): Scene {
        return this._scene;
    }

    public constructor() {
        this._scene = new Scene;
        this.initialisationPiste();
        this._scene.add(this.piste);
    }

    private initialisationPiste(): void {
        this.piste = new PisteJeu();
        this.piste.importer(this.points);

        if (!this.piste.estValide) {
            this.piste = new PisteJeu();
            this.piste.importer(PISTE_TEST);
        }
    }

    public get obtenirPoints(): Point[] {
        return this.piste.exporter();
    }

    public get obtenirZoneDepart(): Vector3 {
        return this.piste.zoneDeDepart;
    }
}
