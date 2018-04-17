import { Injectable, Inject } from "@angular/core";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireScenePiste } from "../scene/GestionnaireScenePiste";

@Injectable()
export class ServiceDeRenduPistes extends ServiceDeRenduAbstrait {

    public constructor(@Inject(GestionnaireScenePiste) gestionnaireScene: GestionnaireScenePiste,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste) {
    super(gestionnaireEcran, gestionnaireCamera, gestionnaireScene);
    }
}
