import { Injectable } from "@angular/core";
import { BoxGeometry, BackSide, Mesh, MeshBasicMaterial, TextureLoader,
         MultiMaterial, PlaneGeometry, AmbientLight, MeshPhongMaterial,
         DirectionalLight, Texture, RepeatWrapping } from "three";
import { RAD_TO_DEG } from "../constants";

// Paysage
const TAILLE_SKYBOX: number = 8192;
const RAPPOR_HAUTEUR_SOL: number = 25;
const HAUTEUR_SOL: number = TAILLE_SKYBOX / RAPPOR_HAUTEUR_SOL;
const NOMBRE_FACE_CUBE: number = 6;
const CHEMIN: string = "./../../../assets/";
const CHEMIN_PAYSAGE: string = CHEMIN + "skybox/";
const URL_SKYBOX_JOUR: string[] = ["jour1/", "jour2/"];
const URL_SKYBOX_NUIT: string[] = ["nuit1/", "nuit2/"];
const FORMAT: string = ".jpg";

// Plancher
// const COULEUR_PLANCHER_JOUR: number[] = [VERT, GRIS];
// const COULEUR_PLANCHER_NUIT: number[] = [VERT_FONCE, BRUN_FONCE];
const CHEMIN_TEXTURE: string = CHEMIN_PAYSAGE + "textures/";
const TEXTURE_PLANCHER_JOUR: string[] = ["grass2", "roche1"];
const TEXTURE_PLANCHER_NUIT: string[] = ["grass4", "pave1"];
const TAILLE_REPETITION: number = 1024;

// Lumière ambiante
const COULEUR_LUMIERE_AMBIANTE: number = 0xFFFFFF;
const INTENSITE_AMBIANTE_NUIT: number = 0.3;
const INTENSITE_AMBIANTE_JOUR: number = 0.7;
const COULEUR_LUMIERE_SOLEIL: number = 0xFFFFFF;
const INTENSITE_SOLEIL: number = 0.1;
// const POSITION_SOLEIL: Vector3 = new Vector3(0, 1, 0);

@Injectable()
export class GestionnaireSkybox {

    private estModeNuit: boolean;
    private skyboxCourante: Mesh;
    private urlSkyboxCourante: string;
    private urlSkybox: string[];

    public get skybox(): Mesh {
        return this.skyboxCourante;
    }

    public constructor() {
        this.estModeNuit = true;
        this.initialiserURL();
        this.charger();
    }

    private initialiserURL(): void {
        this.estModeNuit
            ? this.urlSkybox = URL_SKYBOX_NUIT
            : this.urlSkybox = URL_SKYBOX_JOUR;

        this.urlSkyboxCourante = this.urlSkybox[0];
    }

    private charger(): void {
        this.chargerPaysage();
        this.chargerPlancher();
        this.chargerLumieres();
    }

    private chargerPaysage(): void {
        const materiaux: MeshBasicMaterial[] = [];

        const URLS: string[] = [
            CHEMIN_PAYSAGE + this.urlSkyboxCourante + "posx" + FORMAT,
            CHEMIN_PAYSAGE + this.urlSkyboxCourante + "negx" + FORMAT,
            CHEMIN_PAYSAGE + this.urlSkyboxCourante + "posy" + FORMAT,
            CHEMIN_PAYSAGE + this.urlSkyboxCourante + "negy" + FORMAT,
            CHEMIN_PAYSAGE + this.urlSkyboxCourante + "posz" + FORMAT,
            CHEMIN_PAYSAGE + this.urlSkyboxCourante + "negz" + FORMAT,
        ];

        for (let i: number = 0 ; i < NOMBRE_FACE_CUBE ; i++) {
            materiaux.push(new MeshBasicMaterial({map: new TextureLoader().load(URLS[i]), side: BackSide}));
        }

        const boite: BoxGeometry = new BoxGeometry(TAILLE_SKYBOX, TAILLE_SKYBOX, TAILLE_SKYBOX);
        boite.translate(0, HAUTEUR_SOL, 0);
        this.skyboxCourante = new Mesh(boite, new MultiMaterial(materiaux));
    }

    private chargerPlancher(): void {
        const geometrie: PlaneGeometry = new PlaneGeometry( TAILLE_SKYBOX, TAILLE_SKYBOX, 1, 1 );
        const materiel: MeshPhongMaterial = new MeshPhongMaterial( { side: BackSide, map: this.obtenirTexturePlancher() } );
        const plancher: Mesh = new Mesh( geometrie, materiel );
        plancher.receiveShadow = true;
        const ANGLE: number = 90;
        plancher.rotation.x = ANGLE / RAD_TO_DEG;
        plancher.castShadow = true;
        this.skybox.add(plancher);
    }

    private obtenirTexturePlancher(): Texture {
        let nomFichiertexturePlancher: string;

        this.estModeNuit
            ? nomFichiertexturePlancher = TEXTURE_PLANCHER_NUIT[this.positionCouranteSkybox()]
            : nomFichiertexturePlancher = TEXTURE_PLANCHER_JOUR[this.positionCouranteSkybox()];

        const texturePlancher: Texture = new TextureLoader().load(CHEMIN_TEXTURE + nomFichiertexturePlancher + FORMAT);
        texturePlancher.wrapS = texturePlancher.wrapT = RepeatWrapping;
        texturePlancher.offset.set(0, 0);
        texturePlancher.repeat.set(TAILLE_REPETITION, TAILLE_REPETITION);

        return texturePlancher;
    }

    private positionCouranteSkybox(): number {
        return this.urlSkybox.findIndex((nom) => this.urlSkyboxCourante === nom );
    }

    private chargerLumieres(): void {
        this.chargerLumiereAmbiante();
        this.chargerSoleil();
    }

    private chargerLumiereAmbiante(): void {
        let opacite: number;

        this.estModeNuit
            ? opacite = INTENSITE_AMBIANTE_NUIT
            : opacite = INTENSITE_AMBIANTE_JOUR;

        this.skyboxCourante.add(new AmbientLight(COULEUR_LUMIERE_AMBIANTE, opacite));
    }

    private chargerSoleil(): void {
        if (!this.estModeNuit) {
            const soleil: DirectionalLight = new DirectionalLight(COULEUR_LUMIERE_SOLEIL, INTENSITE_SOLEIL);
            // soleil.position = POSITION_SOLEIL;
            soleil.castShadow = true;
            this.skyboxCourante.add(soleil);
        }
    }

    public changerTempsJournee(): void {
        this.estModeNuit = !this.estModeNuit;
        this.initialiserURL();
        this.charger();
    }

    public changerDecor(): void {
        this.urlSkyboxCourante = this.urlSkybox[(this.positionCouranteSkybox() + 1) % this.urlSkybox.length];
        this.charger();
    }
}
