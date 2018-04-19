import { Sprite, Vector3, SpriteMaterial, Texture } from "three";
import { SonDepart } from "../son/SonDepart";
import { DeroulemenCourseService } from "../deroulement-course/deroulemen-course.service";

const ROUGE: string = "#ff0000";
const VERT: string = "#00ff00";
const BLEU: string = "#0000ff";

const TEMPS_SIGNAL_DEPART: number = 650;
const TEMPS_MAXIMAL: number = 10;
const DEBUT_COMPTEUR: number = 3;

const MESSAGE_PREPARATION: string = "Préparez-vous";
const SIGNAL_DEPART: string = "GO";

const DIMENSION: number = 10;
const DIMENSION_CANEVAS: number = 256;
const HAUTEUR: number = 3;

export class SignalDepart extends Sprite {

    private compteur: number;
    private readonly zoneDepart: Vector3;
    private canvas: HTMLCanvasElement;

    public constructor(zoneDepart: Vector3, private sonDepart: SonDepart) {
        super();
        this.zoneDepart = zoneDepart;
        this.compteur = TEMPS_MAXIMAL;
        this.creerNouveauCanvas();
    }

    public demarrer(): void {
        if (this.compteur >= 0) {
            this.passerAuProchainMessage();
            setTimeout(() => {
                if (this.compteur === DEBUT_COMPTEUR) {
                    this.sonDepart.jouerSon();
                }
                this.demarrer();
            },         TEMPS_SIGNAL_DEPART);
        } else {
            this.retirerMessage();
        }
    }

    private passerAuProchainMessage(): void {
        if (this.compteur > DEBUT_COMPTEUR) {
            this.compteur--;
            this.nouveauSignal(MESSAGE_PREPARATION, BLEU);
        } else if (this.compteur > 0) {
            this.nouveauSignal((this.compteur--).toString(), ROUGE);
        } else {
            this.compteur--;
            this.nouveauSignal(SIGNAL_DEPART, VERT);
            DeroulemenCourseService.debutCourse();
        }
    }

    private nouveauSignal(texte: string, couleur: string): void {
        this.remplirContexte(texte, couleur);
        this.miseAJourSprite();
    }

    private miseAJourSprite(): void {
        this.material = this.materielSprite;
        this.scale.set(DIMENSION, DIMENSION, 1);
        this.position.set(this.zoneDepart.x, HAUTEUR, this.zoneDepart.z);
    }

    private get materielSprite(): SpriteMaterial {
        const spriteMap: Texture = new Texture(this.canvas);
        spriteMap.needsUpdate = true;

        return new SpriteMaterial({ map: spriteMap });
    }

    // Source: https://stackoverflow.com/questions/14103986/canvas-and-spritematerial
    private remplirContexte(texte: string, couleur: string): void {
        this.creerNouveauCanvas();
        const context: CanvasRenderingContext2D = this.canvas.getContext("2d");
        context.fillStyle = couleur;
        context.textAlign = "center";
        context.font = "24px Arial";
        const DEUX: number = 2;
        context.fillText(texte, DIMENSION_CANEVAS / DEUX, DIMENSION_CANEVAS / DEUX);
    }

    private creerNouveauCanvas(): void {
        this.canvas = document.createElement("canvas");
        this.canvas.width = DIMENSION_CANEVAS;
        this.canvas.height = DIMENSION_CANEVAS;
    }

    private retirerMessage(): void {
        this.nouveauSignal("", VERT);
    }

    public get estTermine(): boolean {
        return this.compteur < 0;
    }
}
