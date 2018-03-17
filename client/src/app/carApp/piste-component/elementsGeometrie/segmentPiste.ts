import { Group, Mesh, CircleGeometry, MeshBasicMaterial, PlaneGeometry, Vector3, DoubleSide } from "three";
import { Droite } from "./Droite";
import { Point } from "./Point";
import { PI_OVER_2 } from "../../constants";

export const LARGEUR_PISTE: number = 10;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_PISTE: number = 0x000000;
const DROITE_REFERENCE: Droite = new Droite(new Point(0, 0), new Point(0, 1));
const HAUTEUR_PISTE: number = 0.01;

export class SegmentPiste extends Group {

    private droite: Droite;

    public constructor(point1: Point, point2: Point) {
        super();
        this.droite = new Droite(point1, point2);
        this.position.set(point1.x, HAUTEUR_PISTE, point1.y);
        this.ajouterCercle();
        this.ajouterSegment();
    }

    private ajouterCercle(): void {
        const DEUX: number = 2;
        const cercle: Mesh = new Mesh(new CircleGeometry(LARGEUR_PISTE / DEUX, NOMBRE_SEGMENTS), this.materiel);
        cercle.rotateX(PI_OVER_2);
        cercle.receiveShadow = true;
        this.add(cercle);
    }

    private ajouterSegment(): void {
        const segment: Mesh = new Mesh(this.geometrieSegment, this.materiel);
        segment.receiveShadow = true;
        this.add(segment);
    }

    private get materiel(): MeshBasicMaterial {
        return new MeshBasicMaterial( {color: COULEUR_PISTE, side: DoubleSide});
    }

    private get geometrieSegment(): PlaneGeometry {
        const geometrie: PlaneGeometry = new PlaneGeometry(LARGEUR_PISTE, this.droite.distance());
        geometrie.rotateX(PI_OVER_2);
        geometrie.rotateY(this.angle);
        geometrie.translate(this.deplacementSegment.x, this.deplacementSegment.y, this.deplacementSegment.z);

        return geometrie;
    }

    private get centre(): Vector3 {
        return this.droite.getCenter();
    }

    private get deplacementSegment(): Vector3 {
        return this.centre.sub(this.droite.start);
    }

    private get angle(): number {
        return this.droite.direction.cross(DROITE_REFERENCE.direction).y < 0
            ? this.droite.angleAvecDroite(DROITE_REFERENCE)
            : Math.PI - this.droite.angleAvecDroite(DROITE_REFERENCE);
    }
}
