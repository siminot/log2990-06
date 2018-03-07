import Stats = require("stats.js");
import { WebGLRenderer, Scene, Camera } from "three";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ICamera } from "../camera/ICamera";
import { IScene } from "../scene/IScene";

export abstract class ServiceDeRenduAbstrait {
    private stats: Stats;
    protected renderer: WebGLRenderer;
    protected tempsDerniereMiseAJour: number;

    public constructor(protected gestionnaireEcran: GestionnaireEcran,
                       protected gestionnaireCamera: ICamera,
                       protected gestionnaireScene: IScene) {
        this.renderer = new WebGLRenderer();
    }

    // Initialisation

    public async initialiser(): Promise<void> {
        this.initialiserStats();
        this.commencerBoucleDeRendu();
    }

    private initialiserStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.gestionnaireEcran.ajouterElementConteneur(this.stats.dom);
    }

    // Rendu

    private commencerBoucleDeRendu(): void {
        this.renderer.setPixelRatio(devicePixelRatio);
        this.gestionnaireEcran.ajouterElementConteneur(this.renderer.domElement);
        this.redimensionnement();

        this.tempsDerniereMiseAJour = Date.now();

        this.rendu();
    }

    private rendu(): void {
        requestAnimationFrame(() => this.rendu());
        this.miseAJour();
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    protected miseAJour(): void { }

    // Mise à jour de la taille de la fenetre

    public redimensionnement(): void {
        this.renderer.setSize(this.gestionnaireEcran.largeur, this.gestionnaireEcran.hauteur);
        this.gestionnaireCamera.redimensionnement(this.gestionnaireEcran.largeur, this.gestionnaireEcran.hauteur);
    }

    // Obtenir la scene et la camera

    protected get scene(): Scene {
        return this.gestionnaireScene.scene;
    }

    protected get camera(): Camera {
        return this.gestionnaireCamera.camera;
    }
}
