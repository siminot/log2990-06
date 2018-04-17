import { Component, Input, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { ServiceDeRenduApercu } from "../serviceDeRendu/serviceDeRenduApercu";
import { GestionnaireSceneApercu } from "../scene/GestionnaireSceneApercu";
import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

@Component({
    moduleId: module.id,
    selector: "app-apercu-piste-component",
    templateUrl: "./apercuPiste.component.html",
    styleUrls: ["./apercuPiste.component.css"]
})

export class ApercuPisteComponent implements AfterViewInit {

    @ViewChild("container")
    protected containerRef: ElementRef;
    @Input() public piste: IDefinitionPoint[];
    private serviceDeRendu: ServiceDeRenduApercu;
    private gestionnaireScene: GestionnaireSceneApercu;
    // private gestionnaireScene: GestionnaireSceneApercu;

    public constructor(private gestionnaireEcran: GestionnaireEcran) {
        this.serviceDeRendu = new ServiceDeRenduApercu(gestionnaireEcran);
        this.gestionnaireScene = new GestionnaireSceneApercu();
    }

    public ngAfterViewInit(): void {
        this.gestionnaireScene.initialisationPiste(this.piste);
        this.gestionnaireEcran.initialiserConteneur(this.containerRef.nativeElement);
        this.initialiserServiceDeRendu();
    }

    protected initialiserServiceDeRendu(): void {
        this.serviceDeRendu
        .initialiser(this.gestionnaireScene)
        .then(/* do nothing */)
        .catch((err) => console.error(err));
    }
}
