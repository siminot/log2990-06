import { Injectable } from "@angular/core";
import { Camera } from "three";
import { Voiture } from "../voiture/voiture";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu2D } from "./CameraJeu2D";
import { CameraJeu3D } from "./CameraJeu3D";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

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

    public initialiserCameras(): void {
        this.ajouterNouvelleCamera3D();
        this.ajouterNouvelleCamera2D();
        this.suivre(this.gestionnaireVoitures.voitureJoueur);
        this.cameraCourante = this.cameras[0];
    }

    private ajouterNouvelleCamera2D(): void {
        this.cameras.push(new CameraJeu2D());
    }

    private ajouterNouvelleCamera3D(): void {
        this.cameras.push(new CameraJeu3D());
    }

    // Modifications des cameras

    public suivre(voiture: Voiture): void {
        for (const camera of this.cameras) {
            camera.miseAJourVoitureSuivie(voiture);
        }
    }

    public miseAJourCameraCourante(): void {
        this.cameraCourante.mettreAJour();
    }

    public changerCamera(): void {
        const POSITION_COURANTE_CAMERA: number = this.cameras.findIndex((cameraJeu) => this.cameraCourante === cameraJeu );
        this.cameraCourante = this.cameras[(POSITION_COURANTE_CAMERA + 1) % this.cameras.length];
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
