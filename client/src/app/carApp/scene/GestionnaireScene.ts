import { Injectable } from "@angular/core";
import { Scene } from "three";
import { Voiture } from "../voiture/voiture";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

@Injectable()
export class GestionnaireScene extends Scene {

    private estModeNuit: boolean;

    public get voitureJoueur(): Voiture {
        return this.gestionnaireVoiture.voitureJoueur;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
                       private gestionnaireVoiture: GestionnaireVoitures) {
        super();
        this.estModeNuit = true;
    }

    // Creation de la scene

    public creerScene(): void {
        this.initialiserEnvironnement();
        this.ajouterPiste();
        this.ajouterVoitureJoueur();
        this.ajouterVoituresAI();
    }

    private initialiserEnvironnement(): void {
        this.add(this.gestionnaireSkybox.skybox);
    }

    private ajouterPiste(): void {
        return;
    }

    private ajouterVoitureJoueur(): void {
        this.add(this.gestionnaireVoiture.voitureJoueur);
    }

    private ajouterVoituresAI(): void {
        const VOITURES_AI: Voiture[] = this.gestionnaireVoiture.voituresAI;

        for (const VOITURE of VOITURES_AI) {
            this.add(VOITURE);
        }
    }

    // Changement dans la scene

    public miseAJour(tempsDepuisDerniereTrame: number): void {
            this.gestionnaireVoiture.miseAJourVoitures(tempsDepuisDerniereTrame);
    }

    public changerTempsJournee(): void {
        this.estModeNuit = !this.estModeNuit;
        this.remove(this.gestionnaireSkybox.skybox);
        this.gestionnaireSkybox.changerTempsJournee();
        this.gestionnaireVoiture.changerTempsJournee();
        this.add(this.gestionnaireSkybox.skybox);
    }

    public changerDecor(): void {
        this.remove(this.gestionnaireSkybox.skybox);
        this.gestionnaireSkybox.changerDecor();
        this.add(this.gestionnaireSkybox.skybox);
    }
}
