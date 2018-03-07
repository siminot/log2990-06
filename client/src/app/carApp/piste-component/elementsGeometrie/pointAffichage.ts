import { Point } from "./Point";
import { Mesh, CircleGeometry, MeshBasicMaterial } from "three";
import { PI_OVER_2 } from "../../constants";

const RAYON_POINT: number = 0.25;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_POINT: number = 0xFFFF00;
const DIFFERENCE_PROFONDEUR: number = 0;

export class PointAffichage extends Mesh {

    private _point: Point;

    public constructor(point: Point) {
        super(new CircleGeometry(RAYON_POINT, NOMBRE_SEGMENTS), new MeshBasicMaterial( {color: COULEUR_POINT}));
        this.rotateX(PI_OVER_2);
        this.point = point;
    }

    public get point(): Point {
        return this._point;
    }

    public set point(point: Point) {
        this._point = point;
        this.miseAJourMesh();
    }

    private miseAJourMesh(): void {
        this.position.set(this._point.vecteurPlanXZ.x, this._point.vecteurPlanXZ.y + DIFFERENCE_PROFONDEUR, this._point.vecteurPlanXZ.z);
    }

}
