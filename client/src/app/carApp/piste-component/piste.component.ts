import { Component, Inject } from "@angular/core";
import { AbstractGameComponent } from "../abstract-component/abstract.game.component";
import { ServiceDeRenduPistes } from "../serviceDeRendu/serviceDeRenduPistes";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { Subscription } from "rxjs/Subscription";

@Component({
    moduleId: module.id,
    selector: "app-piste-component",
    templateUrl: "./piste.component.html",
    styleUrls: ["./piste.component.css"]
})

export class PisteComponent extends AbstractGameComponent {
    private _nombreDePoints: number;
    private _estBoucle: boolean;
    private _respectContraintePiste: boolean;

    private _souscriptionNbPoints: Subscription;
    private _souscriptionEstBoucle: Subscription;
    private _souscriptionContraintePiste: Subscription;

    public constructor(@Inject(ServiceDeRenduPistes) serviceDeRendu: ServiceDeRenduPistes,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       private gestionnairePiste: GestionnaireEditionPiste) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
        this.souscrireNombrePoints();
        this.souscrireEstBoucle();
        this.souscrireRespectContraintePiste();
    }

    private souscrireNombrePoints(): void {
        this._souscriptionNbPoints = this.gestionnairePiste.piste.receptionNbPoints()
            .subscribe((nbPoints) => {
                this._nombreDePoints = nbPoints;
        });
    }

    private souscrireEstBoucle(): void {
        this._souscriptionEstBoucle = this.gestionnairePiste.piste.receptionEstBoucle()
            .subscribe((estBoucle) => {
                this._estBoucle = estBoucle;
                console.log(estBoucle);
        });
    }

    private souscrireRespectContraintePiste(): void {
        this._souscriptionContraintePiste = this.gestionnairePiste.piste.receptionContraintePiste()
            .subscribe((respect) => {
                this._respectContraintePiste = respect;
        });
    }

}
