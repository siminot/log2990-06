import { Group, Object3D, Vector3 } from "three";
import { Phare } from "./phare";

const POSITION_CIBLE_Z: number = -10;
const HAUTEUR: number = 0.5;
const LARGEUR: number = 0.5;
const PROFONDEUR: number = -1.65;

export class GroupePhares extends Group {
    private phares: Phare[];
    private ciblePhares: Object3D;

    public constructor() {
        super();
        this.phares = [];
        this.ciblePhares = new Object3D();
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
        for (const PHARE of this.phares) {
            this.add(PHARE);
            PHARE.target = this.ciblePhares;
        }
    }

    public eteindre(): void {
        for (const PHARE of this.phares) {
            PHARE.eteindre();
        }
    }

    public allumer(): void {
        for (const PHARE of this.phares) {
            PHARE.allumer();
        }
    }
}
