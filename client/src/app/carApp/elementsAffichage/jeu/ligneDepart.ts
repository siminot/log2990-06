import { Vector3, TextureLoader, Texture, RepeatWrapping, MeshPhongMaterial, BackSide, Mesh, PlaneGeometry } from "three";
import { LARGEUR_PISTE } from "./segmentPiste";
import { PI_OVER_2 } from "../../constants";

// Texture ligne de depart
const CHEMIN: string = "./../../../../assets/";
const NOM_TEXTURE: string = "ligneDepart";
const FORMAT: string = ".png";
const URL_TEXTURE: string = CHEMIN + NOM_TEXTURE + FORMAT;

const LONGUEUR: number = 3;

export class LigneDeDepart extends Mesh {

    private readonly angle: number;

    public constructor(emplacement: Vector3, angle: number) {
        super();
        this.angle = angle + PI_OVER_2;
        this.position.set(emplacement.x, emplacement.y, emplacement.z);
        this.material = this.materiel;
        this.geometry = this.geometrie;
    }

    private get texture(): Texture {
        const texture: Texture = new TextureLoader().load(URL_TEXTURE);
        texture.wrapS = texture.wrapT = RepeatWrapping;

        return texture;
    }

    private get materiel(): MeshPhongMaterial {
        const texture: Texture = this.texture;
        const rapport: number = 4;
        texture.repeat.set(LONGUEUR / rapport, LARGEUR_PISTE / rapport);

        return new MeshPhongMaterial( {side: BackSide, map: texture, depthWrite: false});
    }

    private get geometrie(): PlaneGeometry {
        const geometrie: PlaneGeometry = new PlaneGeometry(LONGUEUR, LARGEUR_PISTE);
        geometrie.rotateX(PI_OVER_2);
        geometrie.rotateY(this.angle);

        return geometrie;
    }

}
