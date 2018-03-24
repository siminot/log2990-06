import { Vector3, TextureLoader, Texture, RepeatWrapping, MeshPhongMaterial, BackSide, Mesh, PlaneGeometry } from "three";
import { LARGEUR_PISTE } from "./segmentPiste";
import { PI_OVER_2 } from "../../constants";

// Texture ligne de depart
const CHEMIN: string = "./../../../../assets/";
const NOM_TEXTURE: string = "ligneDepart";
const FORMAT: string = ".png";
const URL_TEXTURE: string = CHEMIN + NOM_TEXTURE + FORMAT;

const LONGUEUR: number = 3;
const AXE_Y: Vector3 = new Vector3(0, 1, 0);

export class LigneDeDepart extends Mesh {

    public constructor(emplacement: Vector3, anglePiste: number) {
        super();
        this.position.set(emplacement.x, emplacement.y, emplacement.z);
        this.setRotationFromAxisAngle(AXE_Y, anglePiste + PI_OVER_2);
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

        return geometrie;
    }

}
