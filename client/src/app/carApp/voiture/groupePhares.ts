import { Group, Object3D, Vector3 } from "three";
import { Phare } from "./phare";

const POSITION_CIBLE_Z: number = -10;

export class GroupePhares extends Group {
    private _phares: Phare[];
    private _ciblePhares: Object3D;
    private _sontAllumes: boolean;

    public get sontAllumes(): boolean {
        return this._sontAllumes.valueOf();
    }

    public constructor() {
        super();
        this._phares = [];
        this._ciblePhares = new Object3D();
    }

    public init(): void {
        this.initialiserCible();
        this.initialiserPhares();
        this._sontAllumes = true;
    }

    private initialiserPhares(): void {
        const HAUTEUR: number = 0.5;
        const LARGEUR: number = 0.5;
        const PROFONDEUR: number = -1.65;

        const PHARE_GAUCHE_POSITION_RELATIVE: Vector3 = new Vector3(LARGEUR, HAUTEUR, PROFONDEUR);
        const PHARE_DROITE_POSITION_RELATIVE: Vector3 = new Vector3(-LARGEUR, HAUTEUR, PROFONDEUR);
        this._phares.push(new Phare(PHARE_GAUCHE_POSITION_RELATIVE));
        this._phares.push(new Phare(PHARE_DROITE_POSITION_RELATIVE));

        this.ajouterPhares();
    }

    private initialiserCible(): void {
        this._ciblePhares.position.set(0, 0, POSITION_CIBLE_Z);
        this.add(this._ciblePhares);
    }

    private ajouterPhares(): void {
        for (const PHARE of this._phares) {
            this.add(PHARE);
            PHARE.target = this._ciblePhares;
        }
    }

    public eteindre(): void {
        for (const PHARE of this._phares) {
            PHARE.eteindre();
        }
        this._sontAllumes = false;
    }

    public allumer(): void {
        for (const PHARE of this._phares) {
            PHARE.allumer();
        }
        this._sontAllumes = true;
    }
}
