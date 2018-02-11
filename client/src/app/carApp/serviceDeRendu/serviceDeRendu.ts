import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import { WebGLRenderer } from "three";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";

@Injectable()
export class ServiceDeRendu {
    private conteneur: HTMLDivElement;
    private renderer: WebGLRenderer;
    private stats: Stats;
    private tempsDerniereMiseAJour: number;

    public constructor(private gestionnaireScene: GestionnaireScene,
                       private gestionnaireCamera: GestionnaireCamera) {
    }

    // Initialisation

    public async initialiser(container: HTMLDivElement): Promise<void> {
        if (container) {
            this.conteneur = container;
        }

        await this.initialiserScene();
        this.initialiserCameras();
        this.initialiserStats();
        this.commencerBoucleDeRendu();
    }

    private initialiserStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.conteneur.appendChild(this.stats.dom);
    }

    private async initialiserScene(): Promise<void> {
        await this.gestionnaireScene.creerScene();
    }

    private initialiserCameras(): void {
        this.gestionnaireCamera.initialiserCameras();
        this.redimensionnerCamera();
    }

    // Rendu

    private commencerBoucleDeRendu(): void {
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.conteneur.clientWidth, this.conteneur.clientHeight);

        this.tempsDerniereMiseAJour = Date.now();
        this.conteneur.appendChild(this.renderer.domElement);
        this.rendu();
    }

    private rendu(): void {
        requestAnimationFrame(() => this.rendu());
        this.miseAJour();
        this.renderer.render(this.gestionnaireScene.scene, this.gestionnaireCamera.camera);
        this.stats.update();
    }

    private miseAJour(): void {
        const tempsDepuisDerniereTrame: number = Date.now() - this.tempsDerniereMiseAJour;
        this.gestionnaireScene.miseAJour(tempsDepuisDerniereTrame);
        this.gestionnaireCamera.miseAJourCameraCourante();
        this.tempsDerniereMiseAJour = Date.now();
    }

    // Mise à jour de la taille de la fenetre

    public redimensionnement(): void {
        this.redimensionnerCamera();
        this.renderer.setSize(this.conteneur.clientWidth, this.conteneur.clientHeight);
    }

    public redimensionnerCamera(): void {
        this.gestionnaireCamera.redimensionnement(this.obtenirRatio());
    }

    private obtenirRatio(): number {
        return this.conteneur.clientWidth / this.conteneur.clientHeight;
    }
}
