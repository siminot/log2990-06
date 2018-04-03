import { Injectable, Inject } from "@angular/core";
import { Scene } from "three";
import { IScene } from "./IScene";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { EvenementClavier, TypeEvenementClavier } from "../clavier/evenementClavier";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { PisteJeu } from "../piste/pisteJeu";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { TempsJournee } from "../skybox/tempsJournee";
import { TEMPS_JOURNEE_INITIAL } from "../constants";

// Touches clavier
const CHANGER_DECOR: EvenementClavier = new EvenementClavier("t", TypeEvenementClavier.TOUCHE_RELEVEE);
const CHANGER_HEURE_JOURNEE: EvenementClavier = new EvenementClavier("n", TypeEvenementClavier.TOUCHE_RELEVEE);

@Injectable()
export class GestionnaireScene implements IScene {

    private _scene: Scene;
    private piste: PisteJeu;
    private tempsJournee: TempsJournee;
    private clavier: UtilisateurPeripherique;

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
                       private gestionnaireVoiture: GestionnaireVoitures,
                       @Inject (GestionnaireBDCourse) gestionnaireBDCourse: GestionnaireBDCourse,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier) {
        this._scene = new Scene;
        this.clavier = new UtilisateurPeripherique(gestionnaireClavier);
        this.tempsJournee = TEMPS_JOURNEE_INITIAL;
        this.initialisationTouches();

        this.piste = new PisteJeu();
        this.piste.importer(gestionnaireBDCourse.pointsJeu);
        this.gestionnaireVoiture.initialiser(this.piste);

        this.creerScene();
    }

    protected initialisationTouches(): void {
        this.clavier.ajouter(this.changerDecor.bind(this), CHANGER_DECOR);
        this.clavier.ajouter(this.miseAJourTempsJournee.bind(this), CHANGER_HEURE_JOURNEE);
    }

    public creerScene(): void {
        this.ajouterElements();
        this.avancerTemps();
        this.miseAJourTempsJournee();
    }

    private ajouterElements(): void {
        this._scene.add(this.gestionnaireVoiture.voituresAI);
        this._scene.add(this.piste);
        this._scene.add(this.gestionnaireSkybox.skybox);
        this._scene.add(this.gestionnaireVoiture.voitureJoueur);
    }

    public miseAJour(tempsDepuisDerniereTrame: number): void {
        this.gestionnaireVoiture.miseAJourVoitures(tempsDepuisDerniereTrame);
    }

    public miseAJourTempsJournee(): void {
        this.avancerTemps();
        this._scene.remove(this.gestionnaireSkybox.skybox);
        this.gestionnaireSkybox.changerTempsJournee(this.tempsJournee);
        this._scene.add(this.gestionnaireSkybox.skybox);
        this.gestionnaireVoiture.changerTempsJournee(this.tempsJournee);
    }

    private avancerTemps(): void {
        this.tempsJournee === TempsJournee.Jour
            ? this.tempsJournee = TempsJournee.Nuit
            : this.tempsJournee = TempsJournee.Jour;
    }

    public changerDecor(): void {
        this._scene.remove(this.gestionnaireSkybox.skybox);
        this.gestionnaireSkybox.changerDecor();
        this._scene.add(this.gestionnaireSkybox.skybox);
    }
}
