import { Injectable, Inject } from "@angular/core";
import { Camera } from "three";
import { Voiture } from "../voiture/voiture";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu2D } from "./CameraJeu2D";
import { CameraJeu3D } from "./CameraJeu3D";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { EvenementClavier, TypeEvenementClavier } from "../clavier/evenementClavier";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { ICamera } from "./ICamera";
import { LISTENER } from "../son/SonAbstrait";

const CAMERA_INITIALE: number = 0;

const ZOOM: EvenementClavier = new EvenementClavier("=", TypeEvenementClavier.TOUCHE_APPUYEE);
const DEZOOM: EvenementClavier = new EvenementClavier("-", TypeEvenementClavier.TOUCHE_APPUYEE);
const CHANGER_CAMERA: EvenementClavier = new EvenementClavier("c", TypeEvenementClavier.TOUCHE_RELEVEE);

@Injectable()
export class GestionnaireCamera implements ICamera {

    private cameras: CameraJeu[];
    private cameraCourante: CameraJeu;
    private clavier: UtilisateurPeripherique;

    public get camera(): Camera {
        this.miseAJourCameraCourante();

        return this.cameraCourante.camera;
    }

    public constructor(private gestionnaireVoitures: GestionnaireVoitures,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier) {
        this.cameras = [];
        this.clavier = new UtilisateurPeripherique(gestionnaireClavier);
        this.initialiserCameras();
        this.initialisationTouches();
    }

    protected initialisationTouches(): void {
        this.clavier.ajouter(this.zoomer.bind(this), ZOOM);
        this.clavier.ajouter(this.dezoomer.bind(this), DEZOOM);
        this.clavier.ajouter(this.changerCamera.bind(this), CHANGER_CAMERA);
    }

    private initialiserCameras(): void {
        this.cameras.push(new CameraJeu3D());
        this.cameras.push(new CameraJeu2D());
        this.suivre(this.gestionnaireVoitures.voitureJoueur);
        this.cameraCourante = this.cameras[CAMERA_INITIALE];
        this.cameraCourante.camera.add(LISTENER);
    }

    private suivre(voiture: Voiture): void {
        for (const camera of this.cameras) {
            camera.miseAJourVoitureSuivie(voiture);
        }
    }

    private miseAJourCameraCourante(): void {
        this.cameraCourante.mettreAJour();
    }

    public changerCamera(): void {
        this.cameraCourante.camera.remove(LISTENER);
        this.cameraCourante = this.cameras[(this.indexCameraCourante() + 1) % this.cameras.length];
        this.cameraCourante.camera.add(LISTENER);
    }

    private indexCameraCourante(): number {
        return this.cameras.findIndex((cameraJeu) => this.cameraCourante === cameraJeu);
    }

    public zoomer(): void {
        this.cameraCourante.zoomer();
    }

    public dezoomer(): void {
        this.cameraCourante.dezoomer();
    }

    public redimensionnement(largeur: number, hauteur: number): void {
        for (const cameraJeu of this.cameras) {
            cameraJeu.redimensionnement(largeur, hauteur);
        }
    }
}
