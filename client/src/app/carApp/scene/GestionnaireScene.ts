import { Injectable } from "@angular/core";
import { Scene } from "three";
import { Voiture } from "../voiture/voiture";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

@Injectable()
export class GestionnaireScene extends Scene {

    public get voitureJoueur(): Voiture {
        return this.gestionnaireVoiture.voitureJoueur;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
                       private gestionnaireVoiture: GestionnaireVoitures) {
        super();
    }

    // Creation de la scene

    public creerScene(): void {
        this.ajouterSkybox();
        this.ajouterPiste();
        this.ajouterVoitureJoueur();
        this.ajouterVoituresAI();
    }

    private ajouterSkybox(): void {
        this.add(this.gestionnaireSkybox.skybox);
    }

    private retirerSkybox(): void {
        this.remove(this.gestionnaireSkybox.skybox);
    }

    private ajouterPiste(): void {
        return;
    }

    private ajouterVoitureJoueur(): void {
        this.add(this.gestionnaireVoiture.voitureJoueur);
    }

    private ajouterVoituresAI(): void {
        for (const VOITURE of this.gestionnaireVoiture.voituresAI) {
            this.add(VOITURE);
        }
    }

    // Changement dans la scene

    public miseAJour(tempsDepuisDerniereTrame: number): void {
            this.gestionnaireVoiture.miseAJourVoitures(tempsDepuisDerniereTrame);
    }

    public changerTempsJournee(): void {
        this.retirerSkybox();
        this.gestionnaireSkybox.changerTempsJournee();
        this.ajouterSkybox();

        this.gestionnaireVoiture.changerTempsJournee();
    }

    public changerDecor(): void {
        this.retirerSkybox();
        this.gestionnaireSkybox.changerDecor();
        this.ajouterSkybox();
    }
}
