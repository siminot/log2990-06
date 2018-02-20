import { Group, Object3D, Vector3 } from "three";
import { Phare } from "./phare";

const POSITION_CIBLE_Z: number = -10;

export class GroupePhares extends Group {
    private phares: Phare[];
    private ciblePhares: Object3D;
    private sontAllumes: boolean;

    public constructor() {
        super();
        this.phares = [];
        this.ciblePhares = new Object3D();
    }

    public init(): void {
        this.initialiserCible();
        this.initialiserPhares();
        this.sontAllumes = true;
    }

    private initialiserPhares(): void {
        const HAUTEUR: number = 0.5;
        const LARGEUR: number = 0.5;
        const PROFONDEUR: number = -1.65;

        const PHARE_GAUCHE_POSITION_RELATIVE: Vector3 = new Vector3(LARGEUR, HAUTEUR, PROFONDEUR);
        const PHARE_DROITE_POSITION_RELATIVE: Vector3 = new Vector3(-LARGEUR, HAUTEUR, PROFONDEUR);
        this.phares.push(new Phare(PHARE_GAUCHE_POSITION_RELATIVE));
        this.phares.push(new Phare(PHARE_DROITE_POSITION_RELATIVE));

        this.ajouterPhares();
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
        this.sontAllumes = false;
    }

    public allumer(): void {
        for (const PHARE of this.phares) {
            PHARE.allumer();
        }
        this.sontAllumes = true;
    }
}
