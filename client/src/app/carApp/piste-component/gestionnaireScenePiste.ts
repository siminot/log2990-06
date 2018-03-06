import { Injectable, Inject } from "@angular/core";
import { Scene, GridHelper, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, AxisHelper, SphereGeometry } from "three";
import { IScene } from "../scene/IScene";
import { PI_OVER_2 } from "../constants";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { EvenementSouris, TypeEvenementSouris } from "../souris/evenementSouris";

const RAYON_POINT: number = 0.5;
const COULEUR_POINT: number = 0xFFFF00;

@Injectable()
export class GestionnaireScenePiste implements IScene {

    private _scene: Scene;
    private point: Mesh;
    private souris: UtilisateurPeripherique;

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(@Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris) {
        this._scene = new Scene;
        this.souris = new UtilisateurPeripherique(gestionnaireSouris);
        this.creerScene();
    }

    // Creation de la scene

    public creerScene(): void {
        this.ajouterGrille();
        this.ajouterCouleurDeFond();
        this.ajouterAxes();
        this.ajouterPoint();
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

    private ajouterPoint(): void {
        this.point = new Mesh(new SphereGeometry(RAYON_POINT), new MeshBasicMaterial( {color: COULEUR_POINT}));
        this.point.position.set(0, 1, 0);
        this._scene.add(this.point);
    }

    public insererPointSouris(evenementSouris: MouseEvent): void {
        const point: Mesh = new Mesh(new SphereGeometry(RAYON_POINT), new MeshBasicMaterial( {color: COULEUR_POINT}));
        point.position.set(1, 1, 1);
        this._scene.add(point);
    }

    private inscriptionSouris(): void {
        this.souris.ajouter(this.insererPointSouris.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
    }
}
