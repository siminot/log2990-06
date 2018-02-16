import { Injectable } from "@angular/core";

@Injectable()
export class GestionnaireEcran {

    private conteneur: HTMLDivElement;
    public aEteRedimensionne: boolean;

    public constructor() {
        this.conteneur = null;
        this.aEteRedimensionne = true;
    }

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

    public ajouterElementConteneur(element: HTMLElement): void {
        this.conteneur.appendChild(element);
    }

    public redimensionnement(): void {
        this.aEteRedimensionne = true;
    }
}
