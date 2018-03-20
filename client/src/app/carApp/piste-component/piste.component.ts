import { Component, Inject } from "@angular/core";
import { AbstractGameComponent } from "../game-component/abstract.game.component";
import { ServiceDeRenduPistes } from "../serviceDeRendu/serviceDeRenduPistes";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { GestionnairePiste } from "./GestionnairePiste";

@Component({
    moduleId: module.id,
    selector: "app-piste-component",
    templateUrl: "./piste.component.html",
    styleUrls: ["./piste.component.css"]
})

export class PisteComponent extends AbstractGameComponent {
    private _nombreDePoints: number;

    public constructor(@Inject(ServiceDeRenduPistes) serviceDeRendu: ServiceDeRenduPistes,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       private gestionnairePiste: GestionnairePiste) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
        this._nombreDePoints = this.gestionnairePiste.piste.nombreDePoints();
    }

}
