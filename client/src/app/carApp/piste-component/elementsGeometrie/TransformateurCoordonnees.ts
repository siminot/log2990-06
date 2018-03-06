
import { Point } from "./Point";
import { Vector3, Camera } from "three";
import { ICamera } from "../../camera/ICamera";

const PROFONDEUR_DEFAUT: number = 0.5;

export class TransformateurCoordonnees {

    public constructor(private gestionnaireCamera: ICamera) { }

    public positionEcranVersScene(souris: MouseEvent): Point {
        const souris3D: Vector3 = new Vector3(souris.x, souris.y, PROFONDEUR_DEFAUT);
        const DEUX: number = 2;
        souris3D.x = (souris.clientX / window.innerWidth) * DEUX - 1;
        souris3D.y = - (souris.clientY / window.innerHeight) * DEUX + 1;
        souris3D.unproject(this.camera);

        return new Point(souris3D.x, souris3D.z);
    }

    private get camera(): Camera {
        return this.gestionnaireCamera.camera;
    }

}
