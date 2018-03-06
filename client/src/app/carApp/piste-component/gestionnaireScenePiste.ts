import { Injectable, Inject } from "@angular/core";
import { Scene, GridHelper, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, AxisHelper, CircleGeometry } from "three";
import { IScene } from "../scene/IScene";
import { PI_OVER_2 } from "../constants";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { EvenementSouris, TypeEvenementSouris } from "../souris/evenementSouris";
import { GestionnaireCameraPiste } from "./gestionnaireCameraPiste";
import { TransformateurCoordonnees } from "./elementsGeometrie/TransformateurCoordonnees";
import { Point } from "./elementsGeometrie/Point";

const RAYON_POINT: number = 0.5;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_POINT: number = 0xFFFF00;

@Injectable()
export class GestionnaireScenePiste implements IScene {

    private _scene: Scene;
    private point: Mesh;
    private souris: UtilisateurPeripherique;
    private transformateur: TransformateurCoordonnees;

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(@Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste) {
        this._scene = new Scene;
        this.souris = new UtilisateurPeripherique(gestionnaireSouris);
        this.transformateur = new TransformateurCoordonnees(gestionnaireCamera);
        this.creerScene();
    }

    // Creation de la scene

    public creerScene(): void {
        this.ajouterGrille();
        this.ajouterCouleurDeFond();
        this.ajouterAxes();
        this.inscriptionSouris();
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

    private creerPoint(): void {
        this.point = new Mesh(new CircleGeometry(RAYON_POINT, NOMBRE_SEGMENTS), new MeshBasicMaterial( {color: COULEUR_POINT}));
        this.point.rotateX(PI_OVER_2);
        this._scene.add(this.point);
    }

    public miseAJourPoint(evenementSouris: MouseEvent): void {
        if (this.point === undefined) {
            this.creerPoint();
        }

        const souris: Point = this.transformateur.positionEcranVersScene(evenementSouris);
        this.point.position.set(souris.x, 1, souris.y);
        console.log(this.point.position);
    }

    private inscriptionSouris(): void {
        this.souris.ajouter(this.miseAJourPoint.bind(this), new EvenementSouris(TypeEvenementSouris.DRAG));
    }
}
