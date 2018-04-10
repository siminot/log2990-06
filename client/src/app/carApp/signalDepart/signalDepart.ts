import { Sprite, Vector3, SpriteMaterial, Texture } from "three";
import { SonDepart } from "../son/SonDepart";

const ROUGE: string = "#ff0000";
const VERT: string = "#00ff00";
const BLEU: string = "#0000ff";

const TEMPS_SIGNAL_DEPART: number = 650;
const TEMPS_MAXIMAL: number = 10;
const DEBUT_COMPTEUR: number = 3;

const MESSAGE_PREPARATION: string = "Préparez-vous au départ";
const SIGNAL_DEPART: string = "GO";

export class SignalDepart extends Sprite {

    private compteur: number;
    private readonly zoneDepart: Vector3;

    public constructor(zoneDepart: Vector3, private sonDepart: SonDepart) {
        super();
        this.zoneDepart = zoneDepart;
        this.compteur = TEMPS_MAXIMAL;
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
        }
    }

    // Source: https://stackoverflow.com/questions/14103986/canvas-and-spritematerial
    private nouveauSignal(texte: string, couleur: string): void {
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
        this.material.setValues(spriteMaterial);
        this.scale.set(10, 10, 1);
        this.position.set(this.zoneDepart.x, 3, this.zoneDepart.z);
    }

    private retirerMessage(): void {
        this.nouveauSignal("", VERT);
    }

    public get estTermine(): boolean {
        return this.compteur < 0;
    }
}
