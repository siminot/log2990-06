import { Component, Inject, Input, AfterViewInit } from "@angular/core";
import { AbstractGameComponent } from "../abstract-component/abstract.game.component";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { ServiceDeRenduApercu } from "../serviceDeRendu/serviceDeRenduApercu";
import { GestionnaireSceneApercu } from "../scene/GestionnaireSceneApercu";
import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

@Component({
    moduleId: module.id,
    selector: "app-apercu-piste-component",
    templateUrl: "./apercuPiste.component.html",
    styleUrls: ["./apercuPiste.component.css"]
})

export class ApercuPisteComponent extends AbstractGameComponent implements AfterViewInit {

    @Input() public piste: IDefinitionPoint[];

    public constructor(@Inject(ServiceDeRenduApercu) serviceDeRendu: ServiceDeRenduApercu,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       private gestionnaireScene: GestionnaireSceneApercu) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
    }

    public ngAfterViewInit(): void {
        this.gestionnaireScene.initialisationPiste(this.piste);
    }
}
