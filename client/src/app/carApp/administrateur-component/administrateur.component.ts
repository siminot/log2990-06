import { Component, Inject } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { AbstractListePisteComponent } from "../abstract-component/abstract.listePiste.component";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent extends AbstractListePisteComponent {

    public pistes: PisteBD[];
    public abonnementPistes: Subscription;

    public constructor(private editeurPiste: GestionnaireEditionPiste,
                       @Inject(GestionnaireBDCourse) gestionnaireBD: GestionnaireBDCourse) {
      super(gestionnaireBD);
    }

    public editerPiste(piste: PisteBD): void {
        this.gestionnaireBD.pisteEdition = piste;
    }

    public supprimerPiste(piste: PisteBD): void {
        this.gestionnaireBD.supprimerPiste(piste);
    }

    public creerNouvellePiste(): void {
        this.gestionnaireBD.pisteEdition = null;
    }

    public supprimerToutesPistes(): void {
        for (const piste of this.pistes) {
            this.gestionnaireBD.supprimerPiste(piste);
        }
        window.location.reload();
    }

    public ajoutPistesDeTest(): void {
        // this.editeurPiste.creerNouvellePiste(nom, description);
    }
}
