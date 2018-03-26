import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent {

    public pistes: PisteBD[];

    public abonnementPistes: Subscription;

    public constructor(private gestionnaireBDCourse: GestionnaireBDCourse) {
        this.pistes = gestionnaireBDCourse.pistes;
        this.abonnementPistes = this.gestionnaireBDCourse.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);

    }

    public editerPiste(piste: PisteBD): void {
        this.gestionnaireBDCourse.pisteEdition = piste;
    }

    public supprimerPiste(piste: PisteBD): void {
        this.gestionnaireBDCourse.supprimerPiste(piste);
    }
}
