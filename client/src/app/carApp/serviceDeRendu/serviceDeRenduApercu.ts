import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSceneApercu } from "../scene/GestionnaireSceneApercu";
import { WebGLRenderer, Scene, Camera } from "three";
import { Injectable } from "@angular/core";

@Injectable()
export class ServiceDeRenduApercu /* extends ServiceDeRenduAbstrait */ {
    protected renderer: WebGLRenderer;
    protected tempsDerniereMiseAJour: number;
    private gestionnaireCamera: GestionnaireCameraPiste;
    private gestionnaireScene: GestionnaireSceneApercu;

    public constructor(private gestionnaireEcran: GestionnaireEcran) {
        this.renderer = new WebGLRenderer();
        this.gestionnaireCamera = new GestionnaireCameraPiste();
    }

    // Initialisation

    public async initialiser(gestionnaireScene: GestionnaireSceneApercu): Promise<void> {
        this.gestionnaireScene = gestionnaireScene;
        this.commencerBoucleDeRendu();
    }

    // Rendu

    private commencerBoucleDeRendu(): void {
        this.renderer.setPixelRatio(devicePixelRatio);
        this.gestionnaireEcran.ajouterElementConteneur(this.renderer.domElement);
        this.redimensionnement();

        this.tempsDerniereMiseAJour = Date.now();

        this.rendu();
        console.log(this.gestionnaireScene.scene);
    }

    private rendu(): void {
        requestAnimationFrame(() => this.rendu());
        this.renderer.render(this.scene, this.camera);
    }

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
