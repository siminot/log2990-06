import { Component, Inject } from "@angular/core";
import { AbstractGameComponent } from "../abstract-component/abstract.game.component";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { ServiceDeRenduApercu } from "../serviceDeRendu/serviceDeRenduApercu";

@Component({
    moduleId: module.id,
    selector: "app-apercu-piste-component",
    templateUrl: "./apercuPiste.component.html",
    styleUrls: ["./apercuPiste.component.css"]
})

export class ApercuPisteComponent extends AbstractGameComponent {

    public constructor(@Inject(ServiceDeRenduApercu) serviceDeRendu: ServiceDeRenduApercu,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
    }
}
