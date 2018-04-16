import { Injectable, Input } from "@angular/core";
import { Scene, MeshBasicMaterial, PlaneGeometry, Mesh, DoubleSide } from "three";
import { IScene } from "./IScene";
import { PisteJeu } from "../piste/pisteJeu";
import { PISTE_TEST } from "../piste/pisteTest";
import { Point } from "../elementsGeometrie/point";
import { PI_OVER_2 } from "../constants";
import { PROFONDEUR_SCENE } from "./GestionnaireScenePiste";

const COULEUR_FOND: number = 0xFFFFFF;

@Injectable()
export class GestionnaireSceneApercu extends Scene implements IScene {

    private piste: PisteJeu;
    @Input() private points: Point[];

    public get scene(): Scene {
        return this;
    }

    public constructor() {
        super();
        this.initialisationPiste();
        this.add(this.piste);
        this.ajouterCouleurDeFond(); // POUR TESTER
    }

    private ajouterCouleurDeFond(): void {
        const DIMENSIONS: number = 50000;
        const MATERIEL: MeshBasicMaterial = new MeshBasicMaterial({ color: COULEUR_FOND, side: DoubleSide });
        const geometrie: PlaneGeometry = new PlaneGeometry(DIMENSIONS, DIMENSIONS);
        geometrie.rotateX(PI_OVER_2);
        geometrie.translate(0, PROFONDEUR_SCENE, 0);
        this.add(new Mesh(geometrie, MATERIEL));
    }

    private initialisationPiste(): void {
        this.piste = new PisteJeu();
        this.piste.importer(this.points);

        if (!this.piste.estValide) {
            this.piste = new PisteJeu();
            this.piste.importer(PISTE_TEST);
        }
    }
}
