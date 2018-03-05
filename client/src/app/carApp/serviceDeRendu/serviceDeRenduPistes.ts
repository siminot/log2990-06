import { Injectable, Inject } from "@angular/core";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduAbstrait } from "./servideDeRenduAbstrait";
import { GestionnaireCameraPiste } from "../piste-component/gestionnaireCameraPiste";
import { GestionnaireScenePiste } from "../piste-component/gestionnaireScenePiste";

@Injectable()
export class ServiceDeRenduPistes extends ServiceDeRenduAbstrait {

    public constructor(protected gestionnaireScene: GestionnaireScenePiste,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste) {
    super(gestionnaireEcran, gestionnaireCamera, gestionnaireScene);
    }

    // Initialisation

    protected async initialisation(): Promise<void> { }

    // Rendu

    protected miseAJour(): void { }
}
