import { Group, Object3D, Vector3 } from "three";
import { Phare } from "./phare";

const POSITION_CIBLE_Z: number = -10;
const HAUTEUR: number = 0.5;
const LARGEUR: number = 0.5;
const PROFONDEUR: number = -1.65;

export class GroupePhares extends Group {
    private phares: Phare[];
    private ciblePhares: Object3D;
    private fonctionnent: boolean;

    public constructor() {
        super();
        this.phares = [];
        this.ciblePhares = new Object3D();
        this.fonctionnent = true;
    }

    public initialiser(): void {
        this.initialiserCible();
        this.initialiserPhares();
        this.ajouterPhares();
    }

    private initialiserPhares(): void {
        this.phares.push(new Phare(new Vector3(LARGEUR, HAUTEUR, PROFONDEUR)));
        this.phares.push(new Phare(new Vector3(-LARGEUR, HAUTEUR, PROFONDEUR)));
    }

    private initialiserCible(): void {
        this.ciblePhares.position.set(0, 0, POSITION_CIBLE_Z);
        this.add(this.ciblePhares);
    }

    private ajouterPhares(): void {
        for (const phare of this.phares) {
            this.add(phare);
            phare.target = this.ciblePhares;
        }
    }

    public eteindre(): void {
        for (const phare of this.phares) {
            phare.eteindre();
        }
        this.fonctionnent = false;
    }

    public allumer(): void {
        for (const phare of this.phares) {
            phare.allumer();
        }
        this.fonctionnent = true;
    }

    public changerEtatPhares(): void {
        this.fonctionnent
            ? this.eteindre()
            : this.allumer();
    }
}
