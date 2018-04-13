import { Injectable } from "@angular/core";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireScene } from "../scene/GestionnaireScene";

@Injectable()
export class DeroulemenCourseService {

    public constructor(private gestionnaireVoiture: GestionnaireVoitures,
                       private gestionnaireScene: GestionnaireScene) {
    }

}
