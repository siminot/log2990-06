import { Injectable } from "@angular/core";
import { Scene } from "three";
import { Voiture } from "../voiture/voiture";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { TempsJournee } from "../skybox/skybox";

export const TEMPS_JOURNEE_INITIAL: TempsJournee = TempsJournee.Nuit;

@Injectable()
export class GestionnaireScene extends Scene {

    private tempsJournee: TempsJournee;

    public get voitureJoueur(): Voiture {
        return this.gestionnaireVoiture.voitureJoueur;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
                       private gestionnaireVoiture: GestionnaireVoitures) {
        super();
        this.tempsJournee = TEMPS_JOURNEE_INITIAL;
    }

    // Creation de la scene

    public creerScene(): void {
        this.ajouterElements();
        this.initialiserTempsJournee();
    }

    private ajouterElements(): void {
        this.ajouterSkybox();
        this.ajouterPiste();
        this.ajouterVoitureJoueur();
        this.ajouterVoituresAI();
    }

    private initialiserTempsJournee(): void {
        this.avancerTemps();
        this.changerTempsJournee();
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
        this.avancerTemps();
        this.retirerSkybox();
        this.gestionnaireSkybox.changerTempsJournee(this.tempsJournee);
        this.ajouterSkybox();
        this.gestionnaireVoiture.changerTempsJournee(this.tempsJournee);
    }

    private avancerTemps(): void {
        this.tempsJournee === TempsJournee.Jour
            ? this.tempsJournee = TempsJournee.Nuit
            : this.tempsJournee = TempsJournee.Jour;
    }

    public changerDecor(): void {
        this.retirerSkybox();
        this.gestionnaireSkybox.changerDecor();
        this.ajouterSkybox();
    }
}
