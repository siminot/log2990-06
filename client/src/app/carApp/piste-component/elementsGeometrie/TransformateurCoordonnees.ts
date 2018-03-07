import { Point } from "./Point";
import { Vector3, Camera } from "three";
import { ICamera } from "../../camera/ICamera";
import { GestionnaireEcran } from "../../ecran/gestionnaireEcran";

const PROFONDEUR_DEFAUT: number = 0.5;

export class TransformateurCoordonnees {

    private souris: MouseEvent;

    public constructor(private gestionnaireCamera: ICamera,
                       private gestionnaireEcran: GestionnaireEcran) { }

    public positionEcranVersScene(souris: MouseEvent): Point {
        const souris3D: Vector3 = new Vector3(souris.x, souris.y, PROFONDEUR_DEFAUT);
        const DEUX: number = 2;
        souris3D.x = (souris.offsetX / this.largeur) * DEUX - 1;
        souris3D.y = - (souris.offsetY / this.hauteur) * DEUX + 1;
        souris3D.unproject(this.camera);

        return new Point(souris3D.x, souris3D.z);
    }

    // TODO: Verifier que la souris est dans la scene
    public estSurScene(souris: MouseEvent): boolean {
        this.souris = souris;

        return true;
        // return this.hauteurDansScene && this.largeurDansScene;
    }

    private get camera(): Camera {
        return this.gestionnaireCamera.camera;
    }

    private get largeur(): number {
        return this.gestionnaireEcran.largeur;
    }

    private get hauteur(): number {
        return this.gestionnaireEcran.hauteur;
    }

    private get hauteurDansScene(): boolean {
        return this.souris.offsetX >= 0 &&
               this.souris.offsetX <= this.hauteur;
    }

    private get largeurDansScene(): boolean {
        return this.souris.offsetY >= 0 &&
               this.souris.offsetY <= this.largeur;
    }

}
