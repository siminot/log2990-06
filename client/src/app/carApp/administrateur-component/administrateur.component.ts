import { AfterViewInit, Component } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent implements AfterViewInit {

    public pistes: PisteBD[];

    public constructor(private gestionnaireBD: GestionnaireBDCourse) { }

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    public obtenirPistes(): void {
      this.gestionnaireBD.obtenirPistes().subscribe((piste: PisteBD[]) => this.pistes = piste);
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
}
