import { Injectable } from "@angular/core";
import { Camera } from "three";
import { Voiture } from "../voiture/voiture";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu2D } from "./CameraJeu2D";
import { CameraJeu3D } from "./CameraJeu3D";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

const CAMERA_INITIALE: number = 0;

@Injectable()
export class GestionnaireCamera {

    private cameras: CameraJeu[];
    private cameraCourante: CameraJeu;

    public get camera(): Camera {
        this.miseAJourCameraCourante();

        return this.cameraCourante.camera;
    }

    public constructor(private gestionnaireVoitures: GestionnaireVoitures) {
        this.cameras = [];
        this.initialiserCameras();
    }

    // Initialisation

    private initialiserCameras(): void {
        this.ajouterNouvelleCamera3D();
        this.ajouterNouvelleCamera2D();
        this.suivre(this.gestionnaireVoitures.voitureJoueur);
        this.choisirCameraCouranteInitiale();
    }

    private ajouterNouvelleCamera2D(): void {
        this.cameras.push(new CameraJeu2D());
    }

    private ajouterNouvelleCamera3D(): void {
        this.cameras.push(new CameraJeu3D());
    }

    private choisirCameraCouranteInitiale(): void {
        this.cameraCourante = this.cameras[CAMERA_INITIALE];
    }

    // Modifications des cameras

    private suivre(voiture: Voiture): void {
        for (const camera of this.cameras) {
            camera.miseAJourVoitureSuivie(voiture);
        }
    }

    private miseAJourCameraCourante(): void {
        this.cameraCourante.mettreAJour();
    }

    public changerCamera(): void {
        this.cameraCourante = this.cameras[(this.indexCameraCourante() + 1) % this.cameras.length];
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
