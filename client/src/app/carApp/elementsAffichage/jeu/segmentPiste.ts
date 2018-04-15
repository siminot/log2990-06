import { Group, Mesh, CircleGeometry, PlaneGeometry, Vector3, Texture,
         RepeatWrapping, MeshPhongMaterial, TextureLoader, BackSide } from "three";
import { Droite } from "../../elementsGeometrie/droite";
import { Point } from "../../elementsGeometrie/point";
import { PI_OVER_2, NOM_PISTE_JEU } from "../../constants";

export const LARGEUR_PISTE: number = 10;
const NOMBRE_SEGMENTS: number = 25;
const DROITE_REFERENCE: Droite = new Droite(new Point(0, 0), new Point(0, 1));

// Texture
const CHEMIN: string = "./../../../../assets/skybox/textures/";
const NOM_TEXTURE: string = "roche1";
const FORMAT: string = ".jpg";
const URL_TEXTURE: string = CHEMIN + NOM_TEXTURE + FORMAT;
const TAILLE_REPETITION: number = 8;

export class SegmentPiste extends Group {

    private readonly droite: Droite;

    public constructor(point1: Point, point2: Point) {
        super();
        this.droite = new Droite(point1, point2);
        this.position.set(point1.x, 0, point1.y);
        this.name = NOM_PISTE_JEU;
        this.ajouterCercle();
        const segment: Mesh = new Mesh(this.geometrieSegment, this.obtenirMaterielSelonDimension(this.longueur));
        segment.name = NOM_PISTE_JEU;
        this.add(segment);
    }

    private ajouterCercle(): void {
        const texture: Texture = this.texture;
        texture.repeat.set(LARGEUR_PISTE, LARGEUR_PISTE);

        const DEUX: number = 2;
        const cercle: Mesh = new Mesh(new CircleGeometry(LARGEUR_PISTE / DEUX, NOMBRE_SEGMENTS),
                                      this.obtenirMaterielSelonDimension(LARGEUR_PISTE));
        cercle.rotateX(PI_OVER_2);
        cercle.receiveShadow = true;
        cercle.name = NOM_PISTE_JEU;
        this.add(cercle);
    }

    private obtenirMaterielSelonDimension(dimension: number): MeshPhongMaterial {
        const texture: Texture = this.texture;
        texture.repeat.set(LARGEUR_PISTE / TAILLE_REPETITION, dimension / TAILLE_REPETITION);

        return new MeshPhongMaterial( {side: BackSide, map: texture, depthWrite: false});
    }

    private get texture(): Texture {
        const texture: Texture = new TextureLoader().load(URL_TEXTURE);
        texture.wrapS = texture.wrapT = RepeatWrapping;

        return texture;
    }

    private get geometrieSegment(): PlaneGeometry {
        const geometrie: PlaneGeometry = new PlaneGeometry(LARGEUR_PISTE, this.droite.distance());
        geometrie.rotateX(PI_OVER_2);
        geometrie.rotateY(this.angle);
        geometrie.translate(this.deplacementSegment.x, this.deplacementSegment.y, this.deplacementSegment.z);

        return geometrie;
    }

    public get angle(): number {
        return this.droite.direction.cross(DROITE_REFERENCE.direction).y < 0
            ? this.droite.angleAvecDroite(DROITE_REFERENCE)
            : Math.PI - this.droite.angleAvecDroite(DROITE_REFERENCE);
    }

    public get direction(): Vector3 {
        return this.droite.direction;
    }

    private get deplacementSegment(): Vector3 {
        return this.droite.getCenter().sub(this.droite.start);
    }

    private get longueur(): number {
        return this.droite.direction.length();
    }
}
