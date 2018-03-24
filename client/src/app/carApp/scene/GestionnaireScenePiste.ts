import { Injectable, Inject } from "@angular/core";
import { Scene, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh } from "three";
import { IScene } from "../scene/IScene";
import { PI_OVER_2 } from "../constants";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { PLAN_ELOIGNE } from "../camera/GestionnaireCameraPiste";

export const PROFONDEUR_SCENE: number = PLAN_ELOIGNE;
const COULEUR_FOND: number = 0xB3ECFF;

@Injectable()
export class GestionnaireScenePiste extends Scene implements IScene {

    public get scene(): Scene {
        return this;
    }

    public constructor(@Inject(GestionnaireEditionPiste) gestionnairePiste: GestionnaireEditionPiste) {
        super();
        this.ajouterCouleurDeFond();
        this.add(gestionnairePiste.piste);
    }

    private ajouterCouleurDeFond(): void {
        const DIMENSIONS: number = 50000;
        const MATERIEL: MeshBasicMaterial = new MeshBasicMaterial({ color: COULEUR_FOND, side: DoubleSide });
        const geometrie: PlaneGeometry = new PlaneGeometry(DIMENSIONS, DIMENSIONS);
        geometrie.rotateX(PI_OVER_2);
        geometrie.translate(0, PROFONDEUR_SCENE, 0);
        this.add(new Mesh(geometrie, MATERIEL));
    }
}
