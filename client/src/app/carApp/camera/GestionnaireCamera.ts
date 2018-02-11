import { Injectable } from "@angular/core";
import { PerspectiveCamera } from "three";
import { Voiture } from "../voiture/voiture";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu2D } from "./CameraJeu2D";
import { CameraJeu3D } from "./CameraJeu3D";

@Injectable()
export class GestionnaireCamera {

    private cameras: CameraJeu[];
    private cameraCourante: CameraJeu;

    public get camera(): PerspectiveCamera {
        return this.cameraCourante;
    }

    public constructor() {
        this.cameras = [];
    }

    // Initialisation

    public initialiserCameras(voiture: Voiture): void {
        this.ajouterNouvelleCamera3D();
        this.ajouterNouvelleCamera2D();
        this.suivre(voiture);
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

    public redimensionnement(ratio: number): void {
        for (const cameraJeu of this.cameras) {
            cameraJeu.redimensionnement(ratio);
        }
    }
}
