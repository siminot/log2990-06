import { BoxGeometry, BackSide, Mesh, MeshBasicMaterial, TextureLoader,
         PlaneGeometry, MeshPhongMaterial, Texture, RepeatWrapping, MultiMaterial,
         AmbientLight, DirectionalLight } from "three";
import { RAD_TO_DEG } from "../constants";

export enum TempsJournee { Jour, Nuit }

// Paysage
const TAILLE_SKYBOX: number = 8192;
const RAPPOR_HAUTEUR_SOL: number = 25;
const HAUTEUR_SOL: number = TAILLE_SKYBOX / RAPPOR_HAUTEUR_SOL;
const NOMBRE_FACE_CUBE: number = 6;
const CHEMIN: string = "./../../../assets/";
const CHEMIN_PAYSAGE: string = CHEMIN + "skybox/";
const FORMAT: string = ".jpg";

// Plancher
const CHEMIN_TEXTURE: string = CHEMIN_PAYSAGE + "textures/";
const TAILLE_REPETITION: number = 1024;

// Lumière ambiante
const COULEUR_LUMIERE_AMBIANTE: number = 0xFFFFFF;
const INTENSITE_AMBIANTE_NUIT: number = 0.3;
const INTENSITE_AMBIANTE_JOUR: number = 0.7;
const COULEUR_LUMIERE_SOLEIL: number = 0xFFFFFF;
const INTENSITE_SOLEIL: number = 0.1;
// const POSITION_SOLEIL: Vector3 = new Vector3(0, 1, 0);

export class Skybox extends Mesh {

    private readonly URL_ENVIRONNEMENT: string;
    private readonly URL_PLANCHER: string;
    public readonly tempsJournee: TempsJournee;

    public constructor(tempsJournee: TempsJournee, urlPaysage: string, urlPlancher: string) {
        super();
        this.tempsJournee = tempsJournee;
        this.URL_ENVIRONNEMENT = CHEMIN_PAYSAGE + urlPaysage + "/";
        this.URL_PLANCHER = urlPlancher;

        this.chargerPaysage();
        this.chargerPlancher();
        this.chargerLumiereAmbiante();
        this.chargerSoleil();
    }

    private chargerPaysage(): void {
        const materiaux: MeshBasicMaterial[] = [];

        const URLS: string[] = [
            this.URL_ENVIRONNEMENT + "posx" + FORMAT,
            this.URL_ENVIRONNEMENT + "negx" + FORMAT,
            this.URL_ENVIRONNEMENT + "posy" + FORMAT,
            this.URL_ENVIRONNEMENT + "negy" + FORMAT,
            this.URL_ENVIRONNEMENT + "posz" + FORMAT,
            this.URL_ENVIRONNEMENT + "negz" + FORMAT,
        ];

        for (let i: number = 0 ; i < NOMBRE_FACE_CUBE ; i++) {
            materiaux.push(new MeshBasicMaterial({map: new TextureLoader().load(URLS[i]), side: BackSide}));
        }

        const boite: BoxGeometry = new BoxGeometry(TAILLE_SKYBOX, TAILLE_SKYBOX, TAILLE_SKYBOX);
        boite.translate(0, HAUTEUR_SOL, 0);

        this.geometry = boite;
        this.material = new MultiMaterial( materiaux );
    }

    private chargerPlancher(): void {
        const geometrie: PlaneGeometry = new PlaneGeometry( TAILLE_SKYBOX, TAILLE_SKYBOX, 1, 1 );
        const materiel: MeshPhongMaterial = new MeshPhongMaterial( { side: BackSide, map: this.obtenirTexturePlancher() } );
        const plancher: Mesh = new Mesh( geometrie, materiel );
        plancher.receiveShadow = true;
        const ANGLE: number = 90;
        plancher.rotation.x = ANGLE / RAD_TO_DEG;
        plancher.castShadow = true;
        this.add(plancher);
    }

    private obtenirTexturePlancher(): Texture {
        const texturePlancher: Texture = new TextureLoader().load(CHEMIN_TEXTURE + this.URL_PLANCHER + FORMAT);
        texturePlancher.wrapS = texturePlancher.wrapT = RepeatWrapping;
        texturePlancher.offset.set(0, 0);
        texturePlancher.repeat.set(TAILLE_REPETITION, TAILLE_REPETITION);

        return texturePlancher;
    }

    private chargerLumiereAmbiante(): void {
        let opacite: number;

        this.tempsJournee === TempsJournee.Nuit
            ? opacite = INTENSITE_AMBIANTE_NUIT
            : opacite = INTENSITE_AMBIANTE_JOUR;

        this.add(new AmbientLight(COULEUR_LUMIERE_AMBIANTE, opacite));
    }

    private chargerSoleil(): void {
        if (this.tempsJournee === TempsJournee.Jour) {
            const soleil: DirectionalLight = new DirectionalLight(COULEUR_LUMIERE_SOLEIL, INTENSITE_SOLEIL);
            // soleil.position = POSITION_SOLEIL;
            soleil.castShadow = true;
            this.add(soleil);
        }
    }
}
