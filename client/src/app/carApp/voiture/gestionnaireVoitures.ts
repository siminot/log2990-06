import { Injectable, Inject } from "@angular/core";
import { ObjectLoader, Object3D, Euler, Vector3, Group, LoadingManager } from "three";
import { Voiture } from "../voiture/voiture";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { EvenementClavier, TypeEvenementClavier } from "../clavier/evenementClavier";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { ErreurChargementTexture } from "../../exceptions/erreurChargementTexture";
import { PisteJeu } from "../piste/pisteJeu";
import { PI_OVER_2, TEMPS_JOURNEE_INITIAL } from "../constants";
import { ControleurVoiture } from "../controleurVoiture/controleurVoiture";
import { IObjetEnMouvement } from "./IObjetEnMouvement";
import { TempsJournee } from "../skybox/tempsJournee";
import { GestionnaireCollision } from "../collision/gestionnaireCollisions";

// AI
export const NOMBRE_AI: number = 3;
const ANGLE_DROIT: Euler = new Euler(0, PI_OVER_2, 0);
const AUTO_GAUCHE: number = -2;
const AUTO_DROITE: number = 2;
const AUTO_AVANT: number = 2;
const AUTO_ARRIERE: number = 8;
const POSITION_VOITURES: number[][] = [[AUTO_GAUCHE, AUTO_AVANT], [AUTO_DROITE, AUTO_AVANT],
                                       [AUTO_GAUCHE, AUTO_ARRIERE], [AUTO_DROITE, AUTO_ARRIERE]];

// Textures
const CHEMIN_TEXTURE: string = "../../../assets/voitures/";
const NOMS_TEXTURES: string[] = ["camero-2010-low-poly.json", "voiture-2010-low-poly.json"];

// Couleur voiture
enum CouleurVoiture { JAUNE = 0, ROSE = 1 }
const TEXTURE_DEFAUT_JOUEUR: CouleurVoiture = CouleurVoiture.ROSE;
const TEXTURE_DEFAUT_AI: CouleurVoiture = CouleurVoiture.JAUNE;

// Touches clavier
const ACCELERATEUR_APPUYE: EvenementClavier = new EvenementClavier("w", TypeEvenementClavier.TOUCHE_APPUYEE);
const ACCELERATEUR_RELEVE: EvenementClavier = new EvenementClavier("w", TypeEvenementClavier.TOUCHE_RELEVEE);
const DIRECTION_GAUCHE_APPUYEE: EvenementClavier = new EvenementClavier("a", TypeEvenementClavier.TOUCHE_APPUYEE);
const DIRECTION_GAUCHE_RELEVE: EvenementClavier = new EvenementClavier("a", TypeEvenementClavier.TOUCHE_RELEVEE);
const DIRECTION_DROITE_APPUYE: EvenementClavier = new EvenementClavier("d", TypeEvenementClavier.TOUCHE_APPUYEE);
const DIRECTION_DROITE_RELEVE: EvenementClavier = new EvenementClavier("d", TypeEvenementClavier.TOUCHE_RELEVEE);
const FREIN_APPUYE: EvenementClavier = new EvenementClavier("s", TypeEvenementClavier.TOUCHE_APPUYEE);
const FREIN_RELEVE: EvenementClavier = new EvenementClavier("s", TypeEvenementClavier.TOUCHE_RELEVEE);
const INTERRUPTEUR_LUMIERE: EvenementClavier = new EvenementClavier("l", TypeEvenementClavier.TOUCHE_RELEVEE);

@Injectable()
export class GestionnaireVoitures {

    private _voitureJoueur: Voiture;
    private _voituresAI: Voiture[];
    private controleursAI: ControleurVoiture[];
    private gestionnaireCollisions: GestionnaireCollision;
    private clavier: UtilisateurPeripherique;

    public get voitureJoueur(): Voiture {
        return this._voitureJoueur;
    }

    public get voituresAI(): Group {
        const groupe: Group = new Group();

        for (const voiture of this._voituresAI) {
            groupe.add(voiture);
        }

        return groupe;
    }

    public get tableauVoitureAI(): Voiture[] {
        return this._voituresAI;
    }

    public constructor(@Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier) {
        this._voituresAI = [];
        this.controleursAI = [];
        this.clavier = new UtilisateurPeripherique(gestionnaireClavier);
        this.gestionnaireCollisions = new GestionnaireCollision();
    }

    protected initialisationTouches(): void {
        this.clavier.ajouter(this._voitureJoueur.accelerer.bind(this._voitureJoueur), ACCELERATEUR_APPUYE);
        this.clavier.ajouter(this._voitureJoueur.relacherAccelerateur.bind(this._voitureJoueur), ACCELERATEUR_RELEVE);
        this.clavier.ajouter(this._voitureJoueur.virerGauche.bind(this._voitureJoueur), DIRECTION_GAUCHE_APPUYEE);
        this.clavier.ajouter(this._voitureJoueur.relacherVolant.bind(this._voitureJoueur), DIRECTION_GAUCHE_RELEVE);
        this.clavier.ajouter(this._voitureJoueur.virerDroite.bind(this._voitureJoueur), DIRECTION_DROITE_APPUYE);
        this.clavier.ajouter(this._voitureJoueur.relacherVolant.bind(this._voitureJoueur), DIRECTION_DROITE_RELEVE);
        this.clavier.ajouter(this._voitureJoueur.freiner.bind(this._voitureJoueur), FREIN_APPUYE);
        this.clavier.ajouter(this._voitureJoueur.relacherFreins.bind(this._voitureJoueur), FREIN_RELEVE);
        this.clavier.ajouter(this._voitureJoueur.changerEtatPhares.bind(this._voitureJoueur), INTERRUPTEUR_LUMIERE);
    }

    // Creation des voitures

    public initialiser(piste: PisteJeu): void {
        this.creerVoitureJoueur(piste);
        this.creerVoituresAI(piste);
        this.positionnerVoitures(piste);
        this.initialisationTouches();
        this.changerTempsJournee(TEMPS_JOURNEE_INITIAL);
        this.gestionnaireCollisions.insererSphereDansAutos(this.voitureJoueur, this.tableauVoitureAI);
    }

    private creerVoitureJoueur(piste: PisteJeu): void {
        this._voitureJoueur = new Voiture();
        const rotation: Euler = new Euler(0, piste.premierSegment.angle);
        this.chargerTexture(NOMS_TEXTURES[TEXTURE_DEFAUT_JOUEUR], this._voitureJoueur, rotation)
            .catch(() => { throw new ErreurChargementTexture(); });

    }

    private creerVoituresAI(piste: PisteJeu): void {
        const rotation: Euler = new Euler(0, piste.premierSegment.angle);
        for (let i: number = 0; i < NOMBRE_AI; i++) {
            this._voituresAI.push(new Voiture());
            this.chargerTexture(NOMS_TEXTURES[TEXTURE_DEFAUT_AI], this._voituresAI[i], rotation)
            .catch(() => { throw new ErreurChargementTexture(); });
            this.controleursAI.push(new ControleurVoiture(this._voituresAI[i], piste.exporter()));
        }
    }

    private positionnerVoitures(piste: PisteJeu): void {
        const sensHoraire: number = piste.estSensHoraire() ? 1 : -1;
        let place: number = Math.floor(Math.random() * (NOMBRE_AI + 1));
        for (let i: number = 0; i < NOMBRE_AI + 1; i++) {
            const position: Vector3 = new Vector3(piste.zoneDeDepart.x, piste.zoneDeDepart.y, piste.zoneDeDepart.z);
            const vecteurPerpendiculaire: Vector3 = piste.premierSegment.direction.applyEuler(ANGLE_DROIT).normalize();
            // vecteurPerpendiculaire.applyEuler(ANGLE_DROIT).normalize();
            position.add(vecteurPerpendiculaire.multiplyScalar(POSITION_VOITURES[place][0]));
            position.add(piste.premierSegment.direction.normalize().multiplyScalar(sensHoraire * POSITION_VOITURES[place][1]));
            this.voitures[i].position.set(position.x, position.y, position.z);
            place === this.voitures.length - 1
                ? place = 0
                : place++;
        }
    }

    private async chargerTexture(URL_TEXTURE: string, voiture: Voiture, rotation: Euler): Promise<Object3D> {
        return new Promise<Object3D>((resolve) => {
                    new ObjectLoader(new LoadingManager()).load(
                        CHEMIN_TEXTURE + URL_TEXTURE,
                        (object) => voiture.initialiser(object, rotation));
               });
    }

    // Changements affectant les voitures

    public miseAJourVoitures(tempsDepuisDerniereTrame: number): void {
        for (const voiture of this.voituresEnMouvement) {
            voiture.miseAJour(tempsDepuisDerniereTrame);
        }
        this.gestionnaireCollisions.miseAjour(this.voitureJoueur, this.tableauVoitureAI);
        this.gestionnaireCollisions.gestionCollision(this.voitureJoueur, this.tableauVoitureAI);
    }

    public changerTempsJournee(temps: TempsJournee): void {
        temps === TempsJournee.Jour
            ? this.eteindrePhares()
            : this.allumerPhares();
    }

    private eteindrePhares(): void {
        for (const voiture of this.voitures) {
            voiture.eteindrePhares();
        }
    }

    private allumerPhares(): void {
        for (const voiture of this.voitures) {
            voiture.allumerPhares();
        }
    }

    public get voitures(): Voiture[] {
        return this._voituresAI.concat([this._voitureJoueur]);
    }

    public get voituresEnMouvement(): IObjetEnMouvement[] {
        return (this.controleursAI as IObjetEnMouvement[]).concat([this._voitureJoueur]);
    }
}
