import { BoxGeometry, BackSide, Mesh, MeshBasicMaterial, TextureLoader,
         PlaneGeometry, MeshPhongMaterial, Texture, RepeatWrapping, MultiMaterial,
         AmbientLight, DirectionalLight } from "three";
import { RAD_TO_DEG } from "../constants";
import { ElementsInitialisationSkybox } from "./gestionnaireSkybox";
import { TempsJournee } from "./tempsJournee";

// Paysage
export const TAILLE_SKYBOX: number = 8192;
const RAPPOR_HAUTEUR_SOL: number = 25;
const HAUTEUR_SOL: number = TAILLE_SKYBOX / RAPPOR_HAUTEUR_SOL;
const NOMBRE_FACE_CUBE: number = 6;
const CHEMIN: string = "./../../../assets/";
const CHEMIN_PAYSAGE: string = CHEMIN + "skybox/";
const FORMAT: string = ".jpg";

// Plancher
const CHEMIN_TEXTURE: string = CHEMIN_PAYSAGE + "textures/";
const RAPPRT_TEXTURE: number = 8;
export const TAILLE_REPETITION: number = TAILLE_SKYBOX / RAPPRT_TEXTURE;
export const NOM_SURFACE_HORS_PISTE: string = "horsPiste";

// Lumière ambiante
const COULEUR_LUMIERE_AMBIANTE: number = 0xFFFFFF;
const INTENSITE_AMBIANTE_NUIT: number = 0.3;
const INTENSITE_AMBIANTE_JOUR: number = 0.7;
const INTENSITE_SOLEIL: number = 0.1;

export class Skybox extends Mesh {

    private readonly URL_ENVIRONNEMENT: string;
    private readonly URL_PLANCHER: string;
    private readonly tempsJournee: TempsJournee;

    public constructor(initialisation: ElementsInitialisationSkybox) {
        super();
        this.tempsJournee = initialisation.tempsJournee;
        this.URL_ENVIRONNEMENT = CHEMIN_PAYSAGE + initialisation.paysage + "/";
        this.URL_PLANCHER = initialisation.plancher;
        this.charger();
    }

    private charger(): void {
        this.chargerPaysage();
        this.chargerPlancher();
        this.chargerLumiereAmbiante();
        this.chargerSoleil();
    }

    private chargerPaysage(): void {
        this.chargerBoite();
        this.chargerMateriel();
    }

    private chargerBoite(): void {
        this.geometry = this.boite;
    }

    private chargerMateriel(): void {
        this.material = new MultiMaterial(this.materiauxBoite);
    }

    private chargerPlancher(): void {
        const plancher: Mesh = new Mesh(this.geometriePlancher, this.materielPlancher);
        plancher.name = NOM_SURFACE_HORS_PISTE;
        const ANGLE: number = 90;
        plancher.receiveShadow = true;
        plancher.rotation.x = ANGLE / RAD_TO_DEG;
        plancher.castShadow = true;
        this.add(plancher);
    }

    private chargerLumiereAmbiante(): void {
        this.add(new AmbientLight(COULEUR_LUMIERE_AMBIANTE, this.intensiteLumiereAmbiante));
    }

    private chargerSoleil(): void {
        if (this.estJour) {
            const soleil: DirectionalLight = new DirectionalLight(COULEUR_LUMIERE_AMBIANTE, INTENSITE_SOLEIL);
            soleil.castShadow = true;
            this.add(soleil);
        }
    }

    private get urlMateriaux(): string[] {
        return [
            this.URL_ENVIRONNEMENT + "posx" + FORMAT,
            this.URL_ENVIRONNEMENT + "negx" + FORMAT,
            this.URL_ENVIRONNEMENT + "posy" + FORMAT,
            this.URL_ENVIRONNEMENT + "negy" + FORMAT,
            this.URL_ENVIRONNEMENT + "posz" + FORMAT,
            this.URL_ENVIRONNEMENT + "negz" + FORMAT,
        ];
    }

    private get materiauxBoite(): MeshBasicMaterial[] {
        const materiaux: MeshBasicMaterial[] = [];

        for (let i: number = 0; i < NOMBRE_FACE_CUBE; i++) {
            materiaux.push(new MeshBasicMaterial({ map: new TextureLoader().load(this.urlMateriaux[i]), side: BackSide }));
        }

        return materiaux;
    }

    private get materielPlancher(): MeshPhongMaterial {
        return new MeshPhongMaterial({ side: BackSide, map: this.texturePlancher, depthWrite: false });
    }

    private get geometriePlancher(): PlaneGeometry {
        return new PlaneGeometry(TAILLE_SKYBOX, TAILLE_SKYBOX, 1, 1);
    }

    private get boite(): BoxGeometry {
        const boite: BoxGeometry = new BoxGeometry(TAILLE_SKYBOX, TAILLE_SKYBOX, TAILLE_SKYBOX);
        boite.translate(0, HAUTEUR_SOL, 0);

        return boite;
    }

    private get texturePlancher(): Texture {
        const texturePlancher: Texture = new TextureLoader().load(CHEMIN_TEXTURE + this.URL_PLANCHER + FORMAT);
        texturePlancher.wrapS = texturePlancher.wrapT = RepeatWrapping;
        texturePlancher.offset.set(0, 0);
        texturePlancher.repeat.set(TAILLE_REPETITION, TAILLE_REPETITION);

        return texturePlancher;
    }

    private get estJour(): boolean {
        return this.tempsJournee === TempsJournee.Jour;
    }

    private get intensiteLumiereAmbiante(): number {
        if (this.estJour) {
            return INTENSITE_AMBIANTE_JOUR;
        } else {
            return INTENSITE_AMBIANTE_NUIT;
        }
    }
}
