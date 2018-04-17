import { Injectable } from "@angular/core";
import { Scene, MeshBasicMaterial, PlaneGeometry, Mesh, DoubleSide } from "three";
import { IScene } from "./IScene";
import { PisteJeu } from "../piste/pisteJeu";
import { Point } from "../elementsGeometrie/point";
import { PI_OVER_2 } from "../constants";
import { PROFONDEUR_SCENE } from "./GestionnaireScenePiste";
import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

const COULEUR_FOND: number = 0x0000FF;

@Injectable()
export class GestionnaireSceneApercu extends Scene implements IScene {

    public piste: PisteJeu;

    public get scene(): Scene {
        return this;
    }

    public constructor() {
        super();
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

    public initialisationPiste(piste: IDefinitionPoint[]): void {
        this.piste = new PisteJeu();
        this.piste.importer(this.creationPoints(piste));
        this.add(this.piste);
    }

    private creationPoints(pointsdefinition: IDefinitionPoint[]): Point[] {
        const points: Point[] = [];
        for (const point of pointsdefinition) {
            points.push(new Point(point.x, point.y));
        }

        return points;
    }
}
