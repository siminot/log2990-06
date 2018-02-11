import { Injectable } from "@angular/core";
import { BoxGeometry, BackSide, Mesh, MeshBasicMaterial, TextureLoader, MultiMaterial } from "three";

// Skybox
const TAILLE_SKYBOX: number = 512;
const RAPPOR_HAUTEUR_SOL: number = 25;
const HAUTEUR_SOL: number = TAILLE_SKYBOX / RAPPOR_HAUTEUR_SOL;
const NOMBRE_FACE_CUBE: number = 6;
const CHEMIN: string = "./../../../assets/skybox/";
const URL_SKYBOX_JOUR: string[] = ["jour1/", "jour2/"];
const URL_SKYBOX_NUIT: string[] = ["nuit1/", "nuit2/"];
const FORMAT: string = ".jpg";

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
