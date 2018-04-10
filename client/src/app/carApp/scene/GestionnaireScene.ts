import { Injectable, Inject } from "@angular/core";
import { Scene, Sprite, Vector3, SpriteMaterial, Texture } from "three";
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
import { SonDepart } from "../son/SonDepart";
import { PISTE_TEST } from "../piste/pisteTest";
import { Point } from "../elementsGeometrie/point";

const TEMPS_ATTENTE: number = 10000;
const TEMPS_SIGNAL_DEPART: number = 1000;

// Touches clavier
const CHANGER_DECOR: EvenementClavier = new EvenementClavier("t", TypeEvenementClavier.TOUCHE_RELEVEE);
const CHANGER_HEURE_JOURNEE: EvenementClavier = new EvenementClavier("n", TypeEvenementClavier.TOUCHE_RELEVEE);

@Injectable()
export class GestionnaireScene implements IScene {

    private _scene: Scene;
    private piste: PisteJeu;
    private tempsJournee: TempsJournee;
    private clavier: UtilisateurPeripherique;
    public courseEstCommencee: boolean;

    public get scene(): Scene {
        return this._scene;
    }

    public constructor(private gestionnaireSkybox: GestionnaireSkybox,
        private gestionnaireVoiture: GestionnaireVoitures,
        @Inject(GestionnaireBDCourse) gestionnaireBDCourse: GestionnaireBDCourse,
        @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier) {
        this._scene = new Scene;
        this.clavier = new UtilisateurPeripherique(gestionnaireClavier);
        this.tempsJournee = TEMPS_JOURNEE_INITIAL;
        this.courseEstCommencee = false;
        this.initialisationTouches();
        this.initialisationPiste(gestionnaireBDCourse.pointsJeu);
        this.creerScene();
    }

    private initialisationPiste(point: Point[]): void {
        this.piste = new PisteJeu();
        this.piste.importer(point);

        if (!this.piste.estValide) {
            this.piste = new PisteJeu();
            this.piste.importer(PISTE_TEST);
        }
    }

    protected initialisationTouches(): void {
        this.clavier.ajouter(this.changerDecor.bind(this), CHANGER_DECOR);
        this.clavier.ajouter(this.miseAJourTempsJournee.bind(this), CHANGER_HEURE_JOURNEE);
    }

    public creerScene(): void {
        this.ajouterElements();
        this.avancerTemps();
        this.miseAJourTempsJournee();
        this.signalerDepart();
    }

    private ajouterElements(): void {
        this.gestionnaireVoiture.initialiser(this.piste);
        this._scene.add(this.gestionnaireVoiture.voituresAI);
        this._scene.add(this.piste);
        this._scene.add(this.gestionnaireSkybox.skybox);
        this._scene.add(this.gestionnaireVoiture.voitureJoueur);
    }

    private signalerDepart(): void {
        let sprite: Sprite = this.nouveauSignal("Préparez-vous au départ", "#0000ff");
        this._scene.add(sprite);
        setTimeout(() => {
            this._scene.remove(sprite);
            sprite = this.nouveauSignal("3", "#ff0000");
            this._scene.add(sprite);
            const sonDepart: SonDepart = new SonDepart();
            this._scene.add(sonDepart.obtenirSon);
            sonDepart.jouerSon();
            setTimeout(() => {
                this._scene.remove(sprite);
                sprite = this.nouveauSignal("2", "#ff0000");
                this._scene.add(sprite);
                setTimeout(() => {
                    this._scene.remove(sprite);
                    sprite = this.nouveauSignal("1", "#ff0000");
                    this._scene.add(sprite);
                    setTimeout(() => {
                        this._scene.remove(sprite);
                        sprite = this.nouveauSignal("GO", "#00ff00");
                        this._scene.add(sprite);
                        this.courseEstCommencee = true;
                        setTimeout(() => {
                            this._scene.remove(sprite);
                        },         TEMPS_SIGNAL_DEPART);
                    },         TEMPS_SIGNAL_DEPART);
                },         TEMPS_SIGNAL_DEPART);
            },         TEMPS_SIGNAL_DEPART);
        },         TEMPS_ATTENTE);
    }

    private nouveauSignal(texte: string, couleur: string): Sprite {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const size: number = 256; // CHANGED
        canvas.width = size;
        canvas.height = size;
        const context: CanvasRenderingContext2D = canvas.getContext("2d");
        context.fillStyle = couleur; // CHANGED
        context.textAlign = "center";
        context.font = "24px Arial";
        context.fillText(texte, size / 2, size / 2);

        const spriteMap: Texture = new Texture(canvas);
        spriteMap.needsUpdate = true;
        const spriteMaterial: SpriteMaterial = new SpriteMaterial({ map: spriteMap });
        const sprite: Sprite = new Sprite(spriteMaterial);
        sprite.scale.set(10, 10, 1);
        const position: Vector3 = this.piste.zoneDeDepart;
        sprite.position.set(position.x, 3, position.z);

        return sprite;
    }

    public miseAJour(tempsDepuisDerniereTrame: number): void {
        if (this.courseEstCommencee) {
            this.gestionnaireVoiture.miseAJourVoitures(tempsDepuisDerniereTrame);
        }
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
