import { Component, Inject, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { AbstractGameComponent } from "../abstract-component/abstract.game.component";
import { ServiceDeRenduJeu } from "../serviceDeRendu/serviceDeRenduJeu";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";

@Component({
    moduleId: module.id,
    selector: "app-cargame-component",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})

export class CarGameComponent extends AbstractGameComponent implements OnInit, OnDestroy, AfterViewInit {

    public constructor(@Inject(ServiceDeRenduJeu) public serviceDeRendu: ServiceDeRenduJeu,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
    }

    protected initialiserServiceDeRendu(): void {
        this.serviceDeRendu
        .initialiser()
        .then(() => this.serviceDeRendu.initialiserStats())
        .catch((err) => console.error(err));
    }

    public ngOnInit(): void {
        // console.log("CREER");
    }

    public ngOnDestroy(): void {
        // console.log("DESTROYED");
    }
}
