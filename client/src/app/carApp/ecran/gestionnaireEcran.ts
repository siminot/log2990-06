import { Injectable } from "@angular/core";

@Injectable()
export class GestionnaireEcran {

    private conteneur: HTMLDivElement;

    public constructor() {
        this.conteneur = document.createElement("div");
    }

    public get largeur(): number {
        return this.conteneur.clientWidth;
    }

    public get hauteur(): number {
        return this.conteneur.clientHeight;
    }

    public get ratio(): number {
        return this.largeur / this.hauteur;
    }

    public initialiserConteneur(container: HTMLDivElement): void {
        if (container) {
            this.conteneur = container;
        }
    }

    public ajouterElementConteneur(element: HTMLElement): void {
        this.conteneur.appendChild(element);
    }
}
