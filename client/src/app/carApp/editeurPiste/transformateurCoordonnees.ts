import { Point } from "../elementsGeometrie/point";
import { Vector3 } from "three";
import { ICamera } from "../camera/ICamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";

export class TransformateurCoordonnees {

    public constructor(private gestionnaireCamera: ICamera,
                       private gestionnaireEcran: GestionnaireEcran) { }

    public positionEcranVersScene(souris: MouseEvent): Point {
        const souris3D: Vector3 = new Vector3(souris.x, souris.y, 0);
        const DEUX: number = 2;
        souris3D.x = (souris.offsetX / this.gestionnaireEcran.largeur) * DEUX - 1;
        souris3D.y = - (souris.offsetY / this.gestionnaireEcran.hauteur) * DEUX + 1;
        souris3D.unproject(this.gestionnaireCamera.camera);

        return new Point(souris3D.x, souris3D.z);
    }

    public estSurScene(souris: MouseEvent): boolean {
        return this.gestionnaireEcran.estLaBonneCible(souris.target);
    }
}
