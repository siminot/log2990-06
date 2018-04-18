import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSceneApercu } from "../scene/GestionnaireSceneApercu";
import { WebGLRenderer, Scene, Camera } from "three";
import { Injectable } from "@angular/core";

@Injectable()
export class ServiceDeRenduApercu {
    protected renderer: WebGLRenderer;
    private gestionnaireCamera: GestionnaireCameraPiste;
    private gestionnaireScene: GestionnaireSceneApercu;

    public constructor(private gestionnaireEcran: GestionnaireEcran) {
        this.renderer = new WebGLRenderer();
        this.gestionnaireCamera = new GestionnaireCameraPiste();
    }

    public async initialiser(gestionnaireScene: GestionnaireSceneApercu): Promise<void> {
        this.gestionnaireScene = gestionnaireScene;
        this.initialiserRendu();
    }

    private initialiserRendu(): void {
        this.renderer.setPixelRatio(devicePixelRatio);
        this.gestionnaireEcran.ajouterElementConteneur(this.renderer.domElement);
        this.redimensionnement();
        this.renderer.render(this.scene, this.camera);
    }

    public redimensionnement(): void {
        this.renderer.setSize(this.gestionnaireEcran.largeur, this.gestionnaireEcran.hauteur);
        this.gestionnaireCamera.redimensionnement(this.gestionnaireEcran.largeur, this.gestionnaireEcran.hauteur);
    }

    protected get scene(): Scene {
        return this.gestionnaireScene.scene;
    }

    protected get camera(): Camera {
        return this.gestionnaireCamera.camera;
    }
}
