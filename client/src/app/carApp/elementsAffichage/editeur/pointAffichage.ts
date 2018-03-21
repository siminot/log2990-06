import { Point } from "../../elementsGeometrie/point";
import { Mesh, CircleGeometry, MeshBasicMaterial, Group, RingGeometry } from "three";
import { PI_OVER_2 } from "../../constants";
import { IPoint } from "../../elementsGeometrie/IPoint";
import { ZOOM_DEFAUT } from "../../camera/GestionnaireCameraPiste";

const RAYON: number = 10;
export const RAYON_POINT: number = RAYON / ZOOM_DEFAUT;
const RAPPORT_RAYON_INTERNE: number = 0.75;
const RAYON_INTERNE: number = RAYON_POINT * RAPPORT_RAYON_INTERNE;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_POINT: number = 0xFF8C1A;
const COULEUR_CONTOUR: number = 0x804000;
const DIFFERENCE_PROFONDEUR: number = -1;

export class PointAffichage extends Group implements IPoint {

    private _point: Point;
    private cercle: Mesh;
    private contour: Mesh;

    public get point(): Point {
        return this._point;
    }

    public set point(point: Point) {
        this._point = point;
        this.position.set(this._point.vecteurPlanXZ.x, this._point.vecteurPlanXZ.y + DIFFERENCE_PROFONDEUR, this._point.vecteurPlanXZ.z);
    }

    public constructor(point: Point, estPremier: boolean) {
        super();
        this.point = point;
        this.creerCercle();

        if (estPremier) {
            this.creerContour();
        }
    }

    private creerCercle(): void {
        this.cercle = new Mesh(new CircleGeometry(RAYON_POINT, NOMBRE_SEGMENTS), new MeshBasicMaterial( {color: COULEUR_POINT}));
        this.cercle.rotateX(PI_OVER_2);
        this.add(this.cercle);
    }

    private creerContour(): void {
        this.contour = new Mesh(new RingGeometry(RAYON_INTERNE, RAYON_POINT, NOMBRE_SEGMENTS),
                                new MeshBasicMaterial( {color: COULEUR_CONTOUR}));
        this.contour.rotateX(PI_OVER_2);
        this.add(this.contour);
    }
}
