import { Component, Inject } from "@angular/core";
import { AbstractGameComponent } from "../game-component/abstract.game.component";
import { ServiceDeRenduJeu } from "../serviceDeRendu/serviceDeRenduJeu";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";

@Component({
    moduleId: module.id,
    selector: "app-piste-component",
    templateUrl: "./piste.component.html",
    styleUrls: ["./piste.component.css"]
})

export class PisteComponent extends AbstractGameComponent {

    public constructor(@Inject(ServiceDeRenduJeu) serviceDeRendu: ServiceDeRenduJeu,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
    }

}
