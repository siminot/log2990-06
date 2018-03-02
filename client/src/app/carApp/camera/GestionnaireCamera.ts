import { Injectable, OnDestroy } from "@angular/core";
import { Camera } from "three";
import { Voiture } from "../voiture/voiture";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu2D } from "./CameraJeu2D";
import { CameraJeu3D } from "./CameraJeu3D";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { EvenementClavier, TypeEvenementClavier, FonctionTouche } from "../clavier/evenementClavier";

const CAMERA_INITIALE: number = 0;

// Touches clavier
const ZOOM: EvenementClavier = new EvenementClavier("=", TypeEvenementClavier.TOUCHE_RELEVEE);
const DEZOOM: EvenementClavier = new EvenementClavier("-", TypeEvenementClavier.TOUCHE_RELEVEE);
const CHANGER_VUE: EvenementClavier = new EvenementClavier("v", TypeEvenementClavier.TOUCHE_RELEVEE);

@Injectable()
export class GestionnaireCamera implements OnDestroy {

    private cameras: CameraJeu[];
    private cameraCourante: CameraJeu;
    private touchesEnregistrees: FonctionTouche[];

    public get camera(): Camera {
        this.miseAJourCameraCourante();

        return this.cameraCourante.camera;
    }

    public constructor(private gestionnaireVoitures: GestionnaireVoitures,
                       private gestionnaireClavier: GestionnaireClavier) {
        this.cameras = [];
        this.touchesEnregistrees = [];
        this.initialiserCameras();
        this.initialisationTouches();
    }

    public ngOnDestroy(): void {
        this.desinscriptionTouches();
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

    private initialisationTouches(): void {
        this.creationTouches();
        this.inscriptionTouches();
    }

    private inscriptionTouches(): void {
        for (const touche of this.touchesEnregistrees) {
            this.gestionnaireClavier.inscrire(touche);
        }
    }

    private creationTouches(): void {
        this.touchesEnregistrees.push(new FonctionTouche(this.zoomer.bind(this), ZOOM));
        this.touchesEnregistrees.push(new FonctionTouche(this.dezoomer.bind(this), DEZOOM));
        this.touchesEnregistrees.push(new FonctionTouche(this.changerCamera.bind(this), CHANGER_VUE));
    }

    private desinscriptionTouches(): void {
        for (const touche of this.touchesEnregistrees) {
            this.gestionnaireClavier.desinscrire(touche);
        }
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
