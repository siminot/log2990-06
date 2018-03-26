import { Component, AfterViewInit } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent implements AfterViewInit {

    public pistes: PisteBD[];

    public constructor(private gestionnaireBDCourse: GestionnaireBDCourse) {}

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    public obtenirPistes(): void {
      this.pistes = this.gestionnaireBDCourse.obtenirPistes();
    }
    public editerPiste(piste: PisteBD): void {
      this.gestionnaireBDCourse.pisteEdition = piste;
    }

    public supprimerPiste(piste: PisteBD): void {
      this.gestionnaireBDCourse.supprimerPiste(piste);
    }
}
