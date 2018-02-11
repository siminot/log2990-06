import { Injectable } from "@angular/core";
import { BoxGeometry, BackSide, Mesh, MeshBasicMaterial, TextureLoader,
         MultiMaterial, PlaneGeometry, DoubleSide, AmbientLight, MeshPhongMaterial } from "three";
import { RAD_TO_DEG } from "../constants";

// Couleurs pour le plancher
const NOIR_GRIS: number = 0x0D0D0D;
const GRIS: number = 0x595959;
const VERT: number = 0x669900;

// Paysage
const TAILLE_SKYBOX: number = 8192;
const RAPPOR_HAUTEUR_SOL: number = 25;
const HAUTEUR_SOL: number = TAILLE_SKYBOX / RAPPOR_HAUTEUR_SOL;
const NOMBRE_FACE_CUBE: number = 6;
const CHEMIN: string = "./../../../assets/skybox/";
const URL_SKYBOX_JOUR: string[] = ["jour1/", "jour2/"];
const COULEUR_PLANCHER_JOUR: number[] = [VERT, GRIS];
const COULEUR_PLANCHER_NUIT: number[] = [NOIR_GRIS, NOIR_GRIS];
const URL_SKYBOX_NUIT: string[] = ["nuit1/", "nuit2/"];
const FORMAT: string = ".jpg";

// Lumière ambiante
const BLANC: number = 0xFFFFFF;
// const NOIR: number = 0x000000;
const OPACITE_LUMIERE_NUIT: number = 0.3;
const OPACITE_LUMIERE_JOUR: number = 0.7;

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
        this.chargerLumiereAmbiante();
    }

    private chargerPaysage(): void {
        const materiaux: MeshBasicMaterial[] = [];

        const URLS: string[] = [
            CHEMIN + this.urlSkyboxCourante + "posx" + FORMAT,
            CHEMIN + this.urlSkyboxCourante + "negx" + FORMAT,
            CHEMIN + this.urlSkyboxCourante + "posy" + FORMAT,
            CHEMIN + this.urlSkyboxCourante + "negy" + FORMAT,
            CHEMIN + this.urlSkyboxCourante + "posz" + FORMAT,
            CHEMIN + this.urlSkyboxCourante + "negz" + FORMAT,
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
        let COULEUR_PLANCHER: number;

        this.estModeNuit
            ? COULEUR_PLANCHER = COULEUR_PLANCHER_NUIT[this.positionCouranteSkybox()]
            : COULEUR_PLANCHER = COULEUR_PLANCHER_JOUR[this.positionCouranteSkybox()];

        const materiel: MeshPhongMaterial = new MeshPhongMaterial( { color: COULEUR_PLANCHER } );
        const plancher: Mesh = new Mesh( geometrie, materiel );
        plancher.material.side = DoubleSide;
        const ANGLE: number = 90;
        plancher.rotation.x = ANGLE / RAD_TO_DEG;
        plancher.castShadow = true;
        this.skybox.add(plancher);
    }

    private chargerLumiereAmbiante(): void {
        let opacite: number;

        this.estModeNuit
            ? opacite = OPACITE_LUMIERE_NUIT
            : opacite = OPACITE_LUMIERE_JOUR;

        this.skyboxCourante.add(new AmbientLight(BLANC, opacite));
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

    private positionCouranteSkybox(): number {
        return this.urlSkybox.findIndex((nom) => this.urlSkyboxCourante === nom );
    }
}
