import { Injectable, Inject } from "@angular/core";
import { ObjectLoader, Object3D, Euler, Vector3 } from "three";
import { Voiture } from "../voiture/voiture";
import { TempsJournee } from "../skybox/skybox";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { EvenementClavier, TypeEvenementClavier } from "../clavier/evenementClavier";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { ErreurChargementTexture } from "../../exceptions/erreurChargementTexture";
import { PisteJeu } from "../piste/pisteJeu";
import { PI_OVER_2 } from "../constants";

// AI
export const NOMBRE_AI: number = 3;
const ANGLE_DROIT: Euler = new Euler(0, PI_OVER_2, 0);
const AUTO_GAUCHE: number = -2;
const AUTO_DROITE: number = 2;
const AUTO_ARRIERE: number = 6;
const POSITION_VOITURES: number[][] = [[AUTO_GAUCHE, 0], [AUTO_DROITE, 0], [AUTO_GAUCHE, AUTO_ARRIERE], [AUTO_DROITE, AUTO_ARRIERE]];

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
    private clavier: UtilisateurPeripherique;

    public get voitureJoueur(): Voiture {
        return this._voitureJoueur;
    }

    public get voituresAI(): Voiture[] {
        return this._voituresAI;
    }

    public constructor(@Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier) {
        this._voituresAI = [];
        this.clavier = new UtilisateurPeripherique(gestionnaireClavier);
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
        this.initialisationTouches();
    }

    private creerVoitureJoueur(piste: PisteJeu): void {
        this._voitureJoueur = new Voiture();
        const rotation: Euler = new Euler(0, piste.premierSegment.angle);
        const vecteurPerpendiculaire: Vector3 = piste.premierSegment.vecteur;
        vecteurPerpendiculaire.applyEuler(ANGLE_DROIT).normalize();
        console.log(piste.premierSegment.vecteur.normalize());
        console.log(vecteurPerpendiculaire);
        this.chargerTexture(NOMS_TEXTURES[TEXTURE_DEFAUT_JOUEUR])
            .then((objet: Object3D) => this._voitureJoueur.initialiser(objet, rotation))
            .catch(() => { throw new ErreurChargementTexture(); });
        const position: Vector3 = new Vector3(piste.zoneDeDepart.x, piste.zoneDeDepart.y, piste.zoneDeDepart.z);
        position.add(vecteurPerpendiculaire.multiplyScalar(POSITION_VOITURES[0][0]));
        position.add(piste.premierSegment.vecteur.normalize().multiplyScalar(POSITION_VOITURES[0][1]));
        this._voitureJoueur.position.set(position.x, position.y, position.z);
    }

    private creerVoituresAI(piste: PisteJeu): void {
        const rotation: Euler = new Euler(0, piste.premierSegment.angle);
        for (let i: number = 0; i < NOMBRE_AI; i++) {
            this._voituresAI.push(new Voiture());
            this._voituresAI[i].position.set(piste.zoneDeDepart.x, piste.zoneDeDepart.y, piste.zoneDeDepart.z);
            this.chargerTexture(NOMS_TEXTURES[TEXTURE_DEFAUT_AI])
            .then((objet: Object3D) => this._voituresAI[i].initialiser(objet, rotation))
            .catch(() => { throw new ErreurChargementTexture(); });
            const vecteurPerpendiculaire: Vector3 = piste.premierSegment.vecteur;
            vecteurPerpendiculaire.applyEuler(ANGLE_DROIT).normalize();
            const position: Vector3 = new Vector3(piste.zoneDeDepart.x, piste.zoneDeDepart.y, piste.zoneDeDepart.z);
            position.add(vecteurPerpendiculaire.multiplyScalar(POSITION_VOITURES[i + 1][0]));
            position.add(piste.premierSegment.vecteur.normalize().multiplyScalar(POSITION_VOITURES[i + 1][1]));
            this._voituresAI[i].position.set(position.x, position.y, position.z);
        }
    }

    private async chargerTexture(URL_TEXTURE: string): Promise<Object3D> {
        return new Promise<Object3D>((resolve, reject) => {
            const loader: ObjectLoader = new ObjectLoader();
            loader.load(CHEMIN_TEXTURE + URL_TEXTURE, (object) => {
                resolve(object);
            });
        });
    }

    // Changements affectant les voitures

    public miseAJourVoitures(tempsDepuisDerniereTrame: number): void {
        this.voitureJoueur.update(tempsDepuisDerniereTrame);

        for (const voiture of this._voituresAI) {
            voiture.update(tempsDepuisDerniereTrame);
        }
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
}
