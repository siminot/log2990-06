import { Injectable, Inject } from "@angular/core";
import { Scene } from "three";
import { IScene } from "./IScene";
import { Voiture } from "../voiture/voiture";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { TempsJournee } from "../skybox/skybox";
import { EvenementClavier, TypeEvenementClavier } from "../clavier/evenementClavier";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";

export const TEMPS_JOURNEE_INITIAL: TempsJournee = TempsJournee.Nuit;

// Touches clavier
const CHANGER_DECOR: EvenementClavier = new EvenementClavier("t", TypeEvenementClavier.TOUCHE_RELEVEE);
const CHANGER_HEURE_JOURNEE: EvenementClavier = new EvenementClavier("n", TypeEvenementClavier.TOUCHE_RELEVEE);

@Injectable()
export class GestionnaireScene implements IScene {

    private _scene: Scene;
    private tempsJournee: TempsJournee;
    private clavier: UtilisateurPeripherique;

    public get voitureJoueur(): Voiture {
        return this.gestionnaireVoiture.voitureJoueur;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
                       private gestionnaireVoiture: GestionnaireVoitures,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier) {
        this._scene = new Scene;
        this.clavier = new UtilisateurPeripherique(gestionnaireClavier);
        this.tempsJournee = TEMPS_JOURNEE_INITIAL;
        this.initialisationTouches();
        this.creerScene();
    }

    protected initialisationTouches(): void {
        this.clavier.ajouterTouche(this.changerDecor.bind(this), CHANGER_DECOR);
        this.clavier.ajouterTouche(this.changerTempsJournee.bind(this), CHANGER_HEURE_JOURNEE);
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
        this._scene.add(this.gestionnaireSkybox.skybox);
    }

    private retirerSkybox(): void {
        this._scene.remove(this.gestionnaireSkybox.skybox);
    }

    private ajouterPiste(): void {
        return;
    }

    private ajouterVoitureJoueur(): void {
        this._scene.add(this.gestionnaireVoiture.voitureJoueur);
    }

    private ajouterVoituresAI(): void {
        for (const VOITURE of this.gestionnaireVoiture.voituresAI) {
            this._scene.add(VOITURE);
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
