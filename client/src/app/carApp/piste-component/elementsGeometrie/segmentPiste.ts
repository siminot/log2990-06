import { Group, Mesh, CircleGeometry, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import { Droite } from "./Droite";
import { Point } from "./Point";
import { PI_OVER_2 } from "../../constants";

export const LARGEUR_PISTE: number = 3;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_PISTE: number = 0x000000;

export class SegmentPiste extends Group {

    private droite: Droite;

    public constructor(point1: Point, point2: Point) {
        super();
        this.droite = new Droite(point1, point2);
        this.position.set(point1.x, 0, point1.y);
        this.ajouterCercle();
        this.ajouterSegment();
    }

    private ajouterCercle(): void {
        const DEUX: number = 2;
        const cercle: Mesh = new Mesh(new CircleGeometry(LARGEUR_PISTE / DEUX, NOMBRE_SEGMENTS),
                                      new MeshBasicMaterial( {color: COULEUR_PISTE}));
        cercle.rotateX(PI_OVER_2);
        this.add(cercle);
    }

    private ajouterSegment(): void {
        const MATERIEL: MeshBasicMaterial = new MeshBasicMaterial({ color: COULEUR_PISTE });
        const geometrie: PlaneGeometry = new PlaneGeometry(LARGEUR_PISTE, this.longueur);
        geometrie.rotateX(PI_OVER_2);
        geometrie.translate(this.centre.x, 0, this.centre.z);
        this.add(new Mesh(geometrie, MATERIEL));
    }

    private get centre(): Vector3 {
        return this.droite.getCenter();
    }

    private get longueur(): number {
        return this.droite.distance();
    }

}
