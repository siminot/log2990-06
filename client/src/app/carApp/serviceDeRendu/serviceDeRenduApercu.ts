import { Injectable, Inject } from "@angular/core";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";
import { GestionnaireSceneApercu } from "../scene/GestionnaireSceneApercu";

@Injectable()
export class ServiceDeRenduApercu extends ServiceDeRenduAbstrait {

    public constructor(public gestionnaireScene: GestionnaireSceneApercu,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste) {
        super(gestionnaireEcran, gestionnaireCamera, gestionnaireScene);
    }
}
