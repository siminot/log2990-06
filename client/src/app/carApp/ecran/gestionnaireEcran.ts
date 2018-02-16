import { Injectable } from "@angular/core";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { ServiceDeRendu } from "../serviceDeRendu/serviceDeRendu";

@Injectable()
export class GestionnaireEcran {

    private conteneur: HTMLDivElement;

    public constructor(private gestionnaireCamera: GestionnaireCamera) { }

    public get ratio(): number {
        return this.conteneur.clientWidth / this.conteneur.clientHeight;
    }

    public get largeur(): number {
        return this.conteneur.clientWidth;
    }

    public get hauteur(): number {
        return this.conteneur.clientHeight;
    }

    public initialiserConteneur(container: HTMLDivElement): void {
        if (container) {
            this.conteneur = container;
        }
    }

    public redimensionnement(): void {
        this.gestionnaireCamera.redimensionnement(this.ratio);
    }

    public ajouterElementConteneur(element: HTMLElement): void {
        this.conteneur.appendChild(element);
    }
}
